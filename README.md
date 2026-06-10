# Mini Kanban Task Manager

A full-stack Kanban board to create, organize, and track tasks.

## Live Demo
- Frontend: https://mini-kanban-app-delta.vercel.app
- Backend: https://mini-kanban-app.onrender.com

## Tech Stack
- **Frontend:** React, TypeScript, Tailwind CSS, Axios
- **Backend:** Node.js, Express, TypeScript

## Features
- Create tasks
- Move tasks between To Do and Done
- Delete tasks
- Error handling and loading states

## Run Locally

### Prerequisites
- Node.js
- pnpm

### Setup
```bash
# Clone the repo
git clone https://github.com/Hrithik06/mini-kanban-app

# Install root dependencies (for concurrently)
pnpm install

# Install backend and frontend dependencies
cd backend && pnpm install
cd ../frontend && pnpm install
cd ..

# Run both dev servers
pnpm dev
```

### Environment Variables

**Frontend** `.env`:
```
VITE_API_URL=http://localhost:3000
```
**Backend** `.env`:
```
PORT = 7777
CLIENT_URL = http://localhost:5173
```
