# Product Requirements Document (PRD)

## Project Name
**Chat Task Manager**

## Overview
Build a task management and chat generation system where users can create monologues based on a topic and language level. Save all chats to the database and organize the UI with a collapsible sidebar, structured task flow, and Clerk login for authenticated access.

---

## Goals
- Save user-generated chats ("tasks") in the database.
- Provide a clean sidebar to navigate tasks.
- Implement a clear and simple home/chat interface.
- Secure the app with user authentication (Clerk).

---

## Requirements

### 1. Database: Save Chats to DB
- **ORM**: Use **Drizzle ORM**.
- **Database**: Use **Neon** with environment variable `DATABASE_URL`.
- **Schema**: Create a table `tasks` with the following fields:
  - `id` (UUID, primary key)
  - `type` (string) – Only option now: `"monologue"`
  - `topic` (text)
  - `userInput` (text)
  - `languageLevel` (string)
  - `generatedTextHtml` (text, HTML format)
  - `userId` (UUID, to be linked later)
- **File Structure**:
  - Organize database queries inside `lib/db`.
- **Functions to Implement**:
  - `fetchTasksByUserId(userId: string)`
  - `fetchTaskByTaskId(taskId: string)`
- **Migrations**:
  - Use `drizzle push` to apply schema changes.
- **Create record every time new task(or monologue is generated)**

---

### 2. Frontend: Sidebar and Chat Interface Improvements
- **Sidebar**:
  - Use collapsible sidebar from **shadcn/ui** examples.
  - Collapse/expand with a simple icon.
  - Display:
    - Logo at the top.
    - "New Task" button → redirects to `/` (home page).
    - List of existing tasks fetched from the database.
- **Home/Chat Page**:
  - Limit the chat container width (similar to ChatGPT).
  - Task selection UI:
    - Show available task types (currently: "Monologue"; "Essays" as a disabled mock option).
  - Dynamic Form Rendering:
    - Upon selecting "Monologue", show:
      - Language Level (select input)
      - Topic (small textarea)
      - User Opinion/Input (larger textarea)

---

### 3. Authentication: Login
- **Use Clerk for Authentication**.
- **Route Protection**:
  - Only allow logged-in users to access the app.
  - Redirect unauthenticated users to login.
- **Sidebar (bottom section)**:
  - Display:
    - User's Name
    - User's Profile Image
- **Design System**:
  - Use **shadcn/ui** components for login-related UI.