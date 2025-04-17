import { Sidebar } from "@/components/sidebar"
import { MonologueGenerator } from "@/components/monologue-generator"

export default function MonologuesPage({
  searchParams,
}: {
  searchParams: { level?: string; topic?: string }
}) {
  const { level, topic } = searchParams

  return (
    <>
      <Sidebar />
      <div className="flex-1 p-6 md:p-10">
        <h1 className="text-3xl font-medium mb-8">Monologues</h1>
        <MonologueGenerator initialLevel={level} initialTopic={topic} />
      </div>
    </>
  )
}
