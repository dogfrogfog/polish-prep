import { MonologueGenerator } from "@/components/monologue-generator"

export default function Home({
  searchParams,
}: {
  searchParams: { level?: string; topic?: string }
}) {
  const { level, topic } = searchParams

  return (
    <div className="p-6 md:p-10 max-w-screen-lg mx-auto">
      <h1 className="text-3xl font-medium mb-8 text-center">Create a new task</h1>
      <MonologueGenerator initialLevel={level} initialTopic={topic} />
    </div>
  )
}
