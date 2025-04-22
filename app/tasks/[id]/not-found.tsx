import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function TaskNotFound() {
  return (
    <div className="p-6 md:p-10 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Task Not Found</h2>
        <p className="text-gray-600 mb-6">The task you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/">Create New Task</Link>
        </Button>
      </div>
    </div>
  )
} 