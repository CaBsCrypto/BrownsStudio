// Root "/" — handled by middleware (redirects to /es or /en based on Accept-Language)
// This is only reached if middleware is bypassed (e.g., static export)
import { redirect } from "next/navigation";

export default function RootPage() {
  redirect("/es");
}
