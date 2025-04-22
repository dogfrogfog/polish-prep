import { db } from './drizzle';
import { tasks } from './schema';
import { eq } from 'drizzle-orm';

export async function fetchTasksByUserId(userId: string) {
  return await db.select().from(tasks).where(eq(tasks.userId, userId));
}

export async function fetchTaskByTaskId(taskId: string) {
  return await db.select().from(tasks).where(eq(tasks.id, taskId));
}

export async function fetchAllTasks() {
  return await db.select().from(tasks);
}

export async function createTask(task: {
  type: string;
  topic: string;
  userInput: string;
  languageLevel: string;
  generatedTextHtml: string;
  userId: string;
}) {
  return await db.insert(tasks).values(task).returning();
} 