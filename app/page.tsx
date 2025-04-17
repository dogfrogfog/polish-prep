import { redirect } from "next/navigation"

export default function Home() {
  // Simple redirect to monologues page
  redirect("/monologues")
}
