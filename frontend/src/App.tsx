import { useEffect, useState } from "react";
import type { Task } from "./types/tasks";
import { createTask, deleteTask, getAllTasks, updateTask } from "./api/tasks";
import KanbanColumn from "./components/KanbanColumn";
import AddTaskForm from "./components/AddTaskForm";
import { AlertCircle, Loader2 } from "lucide-react";
function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const doneTasks = tasks.filter((t) => t.status === "done");
  const todoTasks = tasks.filter((t) => t.status === "todo");

  async function handleCreateTask(newTask: string) {
    setError(null);
    try {
      const created = await createTask(newTask);
      setTasks((prev) => [...prev, created]);
    } catch (err: unknown) {
      const { message } = err as { message: string; status: number };
      setError(message);
    }
  }
  async function handleUpdateTask(task: Task) {
    setError(null);
    try {
      const toggled = {
        ...task,
        status: task.status === "todo" ? "done" : "todo",
      } as Task;
      const movedTask = await updateTask(toggled);
      const updatedTasks = tasks.map((t) =>
        t.id === movedTask.id ? movedTask : t,
      );
      setTasks(updatedTasks);
    } catch (err: unknown) {
      const { message, status } = err as { message: string; status: number };
      if (status === 404) {
        // Task doesn't exist on server, remove from UI too
        setTasks((prev) => prev.filter((t) => t.id !== task.id));
      } else {
        setError(message);
      }
    }
  }
  async function handleDeleteTask(id: number) {
    setError(null);
    try {
      await deleteTask(id);
      const filteredTasks = tasks.filter((t) => t.id !== id);
      setTasks(filteredTasks);
    } catch (err: unknown) {
      const { message, status } = err as { message: string; status: number };
      if (status === 404) {
        // Task doesn't exist on server, remove from UI too
        setTasks((prev) => prev.filter((t) => t.id !== id));
      } else {
        setError(message);
      }
    }
  }
  useEffect(() => {
    async function fetchTasks() {
      setError(null);
      try {
        const tasks = await getAllTasks();
        setTasks(tasks);
        setLoading(false);
      } catch (err: unknown) {
        const { message } = err as { message: string; status: number };
        setError(message);
        setLoading(false);
      }
    }
    fetchTasks();
  }, []);

  //For toast
  useEffect(() => {
    if (!error) return;

    const timeout = setTimeout(() => {
      setError(null);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [error]);
  if (loading) {
    return (
      <section className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-violet-600" />
      </section>
    );
  }
  return (
    <section className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-6xl ">
        <div className="mb-8 rounded-2xl bg-linear-to-r from-slate-950 to-slate-700 p-6 text-white">
          <h1 className="text-4xl font-bold">Mini Kanban Task Manager</h1>

          <p className="mt-2 text-slate-300">
            Create, organize and track your tasks.
          </p>
        </div>

        <div className="mb-6">
          <AddTaskForm onAdd={handleCreateTask} />
        </div>

        {error && (
          <div className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 shadow-lg">
            <AlertCircle size={18} className="text-red-600" />

            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <KanbanColumn
            title="To Do"
            tasks={todoTasks}
            onMoveTask={handleUpdateTask}
            onDelete={handleDeleteTask}
            message="No tasks yet"
          />

          <KanbanColumn
            title="Done"
            tasks={doneTasks}
            onMoveTask={handleUpdateTask}
            onDelete={handleDeleteTask}
            message="Get things done"
          />
        </div>
      </div>
    </section>
  );
}

export default App;
