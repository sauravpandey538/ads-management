import { redirect } from "next/navigation";

/** Legacy URL — case studies moved to testimonials. */
export default function ResultsRedirectPage() {
  redirect("/testimonials");
}
