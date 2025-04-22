import { fetchTaskByTaskId } from "@/lib/db/queries"
import { notFound } from "next/navigation"

interface TaskPageProps {
  params: {
    id: string
  }
}

export default async function TaskPage({ params }: TaskPageProps) {
  const tasks = await fetchTaskByTaskId(params.id)
  const task = tasks[0]

  if (!task) {
    notFound()
  }

  return (
    <div className="p-6 md:p-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm font-medium px-2 py-1 rounded bg-purple-100 text-purple-900">
              {task.type}
            </span>
            <span className="text-sm font-medium px-2 py-1 rounded bg-blue-100 text-blue-900">
              {task.languageLevel}
            </span>
          </div>
          <h1 className="text-3xl font-medium">{task.topic}</h1>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-lg font-medium mb-3">Your Input</h2>
            <p className="text-gray-700">{task.userInput}</p>
          </div>

          <div className="bg-white border p-6 rounded-lg">
            <h2 className="text-lg font-medium mb-3">Generated Text</h2>
            <div 
              className="prose prose-purple max-w-none"
              dangerouslySetInnerHTML={{ __html: task.generatedTextHtml }} 
            />
          </div>
        </div>
      </div>
    </div>
  )
} 