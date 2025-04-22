import { fetchTasksByUserId } from "@/lib/db/queries"
import { currentUser } from "@clerk/nextjs/server"
export type TaskItem = {
  id: string
  title: string
  url: string
}

export async function TasksList() {
  const user = await currentUser();

  if(!user) return { taskItems: [] };

  const tasks = await fetchTasksByUserId(user.id);
  
  const taskItems: TaskItem[] = tasks.map((task) => ({
    id: task.id,
    title: `${task.type}: ${task.topic}`,
    url: `/tasks/${task.id}`,
  }))

  return {
    taskItems
  }
} 