import Link from "next/link";

/** Form consent line — links to privacy policy and terms. */
export function LegalConsent() {
  return (
    <p className="text-xs text-center text-ink/55 font-medium leading-relaxed">
      By submitting, you agree to our{" "}
      <Link href="/privacy" className="text-primary underline-offset-2 hover:underline">
        Privacy Policy
      </Link>{" "}
      and{" "}
      <Link href="/terms" className="text-primary underline-offset-2 hover:underline">
        Terms of Service
      </Link>
      . No spam · No lock-in · Your data stays yours.
    </p>
  );
}
