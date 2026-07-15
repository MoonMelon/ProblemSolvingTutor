// Minimal inline-SVG icon set for ProofPath
// All icons use viewBox="0 0 20 20", stroke="currentColor"

const svg = (size, children) => (
  <svg
    width={size} height={size} viewBox="0 0 20 20"
    fill="none" xmlns="http://www.w3.org/2000/svg"
  >
    {children}
  </svg>
)

export function ArrowRightIcon({ size = 16 }) {
  return svg(size, <>
    <path d="M3.5 10h13M12 5.5l4.5 4.5L12 14.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </>)
}

export function ArrowLeftIcon({ size = 16 }) {
  return svg(size, <>
    <path d="M16.5 10h-13M8 5.5L3.5 10 8 14.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </>)
}

export function CheckIcon({ size = 16 }) {
  return svg(size, <>
    <path d="M4 10.5l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </>)
}

export function UploadIcon({ size = 16 }) {
  return svg(size, <>
    <path d="M10 12.5V4M6.5 7.5l3.5-3.5 3.5 3.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 14.5v1.5a1 1 0 001 1h12a1 1 0 001-1v-1.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
  </>)
}

export function BookOpenIcon({ size = 16 }) {
  return svg(size, <>
    <path d="M3 4.5A1 1 0 014 3.5h4.5a2 2 0 012 2V17a2 2 0 00-2-2H4a1 1 0 01-1-1V4.5z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M17 4.5A1 1 0 0016 3.5h-4.5a2 2 0 00-2 2V17a2 2 0 012-2H16a1 1 0 001-1V4.5z" stroke="currentColor" strokeWidth="1.5" />
  </>)
}

export function ClockIcon({ size = 16 }) {
  return svg(size, <>
    <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 6.5V10l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </>)
}

export function SendIcon({ size = 16 }) {
  return svg(size, <>
    <path d="M16.5 3.5L3 9l5.5 2 2 5.5 6-13z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M8.5 11l3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </>)
}

export function MicIcon({ size = 16 }) {
  return svg(size, <>
    <rect x="7" y="2" width="6" height="9" rx="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M4.5 10a5.5 5.5 0 0011 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M10 15.5V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </>)
}

export function PaperclipIcon({ size = 16 }) {
  return svg(size, <>
    <path d="M15.5 9L8.5 16a4 4 0 01-5.657-5.657l7.5-7.5a2.5 2.5 0 013.536 3.536L6.38 13.88a1 1 0 01-1.415-1.415l7.071-7.07" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </>)
}

export function ShieldCheckIcon({ size = 16 }) {
  return svg(size, <>
    <path d="M10 2.5l7 3v4C17 13.5 14 17 10 18.5 6 17 3 13.5 3 9.5v-4l7-3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M7 10.5l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </>)
}

export function AlertTriangleIcon({ size = 16 }) {
  return svg(size, <>
    <path d="M10 2.5L2 16.5h16L10 2.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M10 8.5v3.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    <circle cx="10" cy="14" r=".75" fill="currentColor" />
  </>)
}

export function PlusIcon({ size = 16 }) {
  return svg(size, <>
    <path d="M10 3.5v13M3.5 10h13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
  </>)
}

export function RotateCCWIcon({ size = 16 }) {
  return svg(size, <>
    <path d="M3.5 10A6.5 6.5 0 1010 3.5H6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M3.5 6.5v4h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </>)
}

export function FileTextIcon({ size = 16 }) {
  return svg(size, <>
    <path d="M12 2.5H5a1.5 1.5 0 00-1.5 1.5v12A1.5 1.5 0 005 17.5h10a1.5 1.5 0 001.5-1.5V7l-4.5-4.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M12 2.5V7H16.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M7 10.5h6M7 13h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </>)
}

export function ImageIcon({ size = 16 }) {
  return svg(size, <>
    <rect x="2.5" y="3.5" width="15" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="7.5" cy="7.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2.5 12l4-4 3.5 3.5 2.5-2.5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </>)
}

export function InfoIcon({ size = 16 }) {
  return svg(size, <>
    <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 9v5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    <circle cx="10" cy="6.5" r=".75" fill="currentColor" />
  </>)
}

export function SparkleIcon({ size = 16 }) {
  return svg(size, <>
    <path d="M10 2l1.5 4.5L16 8l-4.5 1.5L10 14l-1.5-4.5L4 8l4.5-1.5L10 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </>)
}
