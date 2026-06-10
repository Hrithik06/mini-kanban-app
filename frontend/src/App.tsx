import { useEffect, useState } from "react";
import type { Task } from "./types/tasks";
import { createTask, deleteTask, getAllTasks, updateTask } from "./api/tasks";
import KanbanColumn from "./components/KanbanColumn";
import AddTaskForm from "./components/AddTaskForm";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const doneTasks = tasks.filter((t) => t.status === "done");
  const todoTasks = tasks.filter((t) => t.status === "todo");

  async function handleCreateTask(newTask: string) {
    try {
      const created = await createTask(newTask);
      setTasks((prev) => [...prev, created]);
      setLoading(false);
    } catch (err: unknown) {
      const { message } = err as { message: string; status: number };
      setError(message);
      setLoading(false);
    }
  }
  async function handleUpdateTask(task: Task) {
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
      setLoading(false);
    } catch (err: unknown) {
      const { message } = err as { message: string; status: number };
      setError(message);
      setLoading(false);
    }
  }
  async function handleDeleteTask(id: number) {
    try {
      await deleteTask(id);
      const filteredTasks = tasks.filter((t) => t.id !== id);
      setTasks(filteredTasks);
      setLoading(false);
    } catch (err: unknown) {
      const { message } = err as { message: string; status: number };
      setError(message);
      setLoading(false);
    }
  }
  useEffect(() => {
    async function fetchTasks() {
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
  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );

  return (
    <section className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 rounded-2xl bg-gradient-to-r from-slate-950 to-slate-700 p-6 text-white">
          <h1 className="text-4xl font-bold">Mini Kanban Task Manager</h1>

          <p className="mt-2 text-slate-300">
            Create, organize and track your tasks.
          </p>
        </div>

        <AddTaskForm onAdd={handleCreateTask} />

        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

        <div className="grid gap-6 md:grid-cols-2 ">
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
  // return (
  //   <>
  //     <section className="flex flex-col justify-center items-center p-10 gap-10">
  //       <h1 className="text-3xl font-bold">Mini Kanban Task Manager</h1>
  //       <AddTaskForm onAdd={handleCreateTask} />
  //       {
  //         <p
  //           className={`text-red-500 text-xs m-2 ${error ? "visible" : "invisible"}`}
  //         >
  //           {error}
  //         </p>
  //       }
  //       <div className="grid gap-6 md:grid-cols-2">
  //         <KanbanColumn
  //           title="To Do"
  //           tasks={todoTasks}
  //           onMoveTask={handleUpdateTask}
  //           onDelete={handleDeleteTask}
  //           message="No tasks yet"
  //         />

  //         <KanbanColumn
  //           title="Done"
  //           tasks={doneTasks}
  //           onMoveTask={handleUpdateTask}
  //           onDelete={handleDeleteTask}
  //           message="Get things done"
  //         />
  //       </div>
  //     </section>
  //   </>
  // );
}

export default App;
