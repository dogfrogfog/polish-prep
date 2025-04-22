import { pgTable, uuid, text, varchar } from 'drizzle-orm/pg-core';

export const tasks = pgTable('tasks', {
  id: uuid('id').primaryKey().defaultRandom(),
  type: varchar('type', { length: 50 }).notNull(),
  topic: text('topic').notNull(),
  userInput: text('user_input').notNull(),
  languageLevel: varchar('language_level', { length: 50 }).notNull(),
  generatedTextHtml: text('generated_text_html').notNull(),
  userId: varchar('user_id', { length: 255 }).notNull(),
}); 