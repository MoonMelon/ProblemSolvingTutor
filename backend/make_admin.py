from pathlib import Path

import firebase_admin
from firebase_admin import credentials, auth


key_path = (
    Path(__file__).parent
    / "secrets"
    / "firebase-admin-key.json"
)

cred = credentials.Certificate(str(key_path))

app = firebase_admin.initialize_app(cred)

print()
print("ADMIN SCRIPT PROJECT:", app.project_id)
print()

email = input("Email to make admin: ").strip()

try:
    user = auth.get_user_by_email(email)

    print()
    print("USER FOUND")
    print("Email:", user.email)
    print("UID:", user.uid)
    print("Claims BEFORE:", user.custom_claims)

    claims = user.custom_claims or {}
    claims["admin"] = True

    auth.set_custom_user_claims(
        user.uid,
        claims
    )

    # Fetch the user AGAIN from Firebase
    updated_user = auth.get_user(user.uid)

    print()
    print("AFTER UPDATE")
    print("Email:", updated_user.email)
    print("UID:", updated_user.uid)
    print("Claims AFTER:", updated_user.custom_claims)

except Exception as error:
    print()
    print("ERROR:")
    print(error)