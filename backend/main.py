import json
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Allows the React dev server to call FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


# ── Request / response models ────────────────────────────────

class AnalyzeRequest(BaseModel):
    problem: str
    student_attempt: str
    official_solution: str | None = None
    level: str = "beginner"

class AnalyzeResponse(BaseModel):
    correct: str
    issue: str
    hint: str
    prompt: str

class ChatMessage(BaseModel):
    role: str   # "user" | "assistant"
    content: str

class ChatRequest(BaseModel):
    problem: str
    student_attempt: str
    conversation: list[ChatMessage]
    official_solution: str | None = None

class ChatResponse(BaseModel):
    reply: str


# ── System prompts ───────────────────────────────────────────

ANALYZE_SYSTEM = """You are a mathematics tutor reviewing a student's attempt at a problem.
Return a JSON object with exactly these four keys:
  correct  – 1-2 sentences on what the student got right
  issue    – 1-2 sentences on the main error or gap (be specific)
  hint     – one focused hint or question; do NOT reveal the answer
  prompt   – a direct invitation for the student to continue working

Keep every value under 80 words. Do not add extra keys."""

CHAT_SYSTEM = """You are a Socratic mathematics tutor. Guide the student toward the solution
using questions and targeted hints. Never give the complete answer or final numeric result.
Keep replies concise: 2-4 sentences maximum."""


# ── Routes ───────────────────────────────────────────────────

@app.get("/")
def home():
    return {"message": "ProofPath backend is running"}


@app.post("/api/analyze", response_model=AnalyzeResponse)
def analyze(body: AnalyzeRequest):
    solution_note = (
        f"\nTrusted solution (for your reference only): {body.official_solution}"
        if body.official_solution else ""
    )
    user_content = (
        f"Problem: {body.problem}\n\n"
        f"Student attempt: {body.student_attempt}"
        f"{solution_note}\n\n"
        f"Student level: {body.level}"
    )
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": ANALYZE_SYSTEM},
                {"role": "user",   "content": user_content},
            ],
            response_format={"type": "json_object"},
            temperature=0.3,
        )
        data = json.loads(response.choices[0].message.content)
        return AnalyzeResponse(**data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/chat", response_model=ChatResponse)
def chat(body: ChatRequest):
    system = CHAT_SYSTEM
    if body.official_solution:
        system += (
            f"\n\nTrusted solution (never reveal this directly): {body.official_solution}"
        )

    messages = [{"role": "system", "content": system}]
    # Seed the conversation with the original problem context
    messages.append({
        "role": "user",
        "content": (
            f"Problem: {body.problem}\n\n"
            f"My original attempt: {body.student_attempt}"
        ),
    })
    # Append the ongoing conversation
    for msg in body.conversation:
        messages.append({"role": msg.role, "content": msg.content})

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            temperature=0.4,
        )
        return ChatResponse(reply=response.choices[0].message.content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))