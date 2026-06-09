import { useEffect, useState } from "react";
import type { Task } from "./types/tasks";
import { createTask, deleteTask, getAllTasks, updateTask } from "./api/tasks";
import KanbanColumn from "./components/KanbanColumn";
import { mockTasks } from "./mockData";

function App() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const doneTasks = tasks.filter((t) => t.status === "done");
  const todoTasks = tasks.filter((t) => t.status === "todo");
  async function handleCreateTask(title: string) {
    const newTask = await createTask(title);
    setTasks((prev) => [...prev, newTask]);
  }
  async function handleUpdateTask(task: Task) {
    console.log(task);
    // const movedTask = await updateTask(task);
    // const updatedTasks = tasks.map((t) =>
    //   t.id === movedTask.id ? movedTask : t,
    // );
    // setTasks(updatedTasks);
  }
  async function handleDeleteTask(id: number) {
    console.log(id);
    // await deleteTask(id);
    // const filteredTasks = tasks.filter((t) => t.id !== id);
    // setTasks(filteredTasks);
  }
  // useEffect(() => {
  //   async function fetchTasks() {
  //     const tasks = await getAllTasks();
  //     setTasks(tasks);
  //   }
  //   fetchTasks();
  // }, []);
  return (
    <>
      <section className="flex flex-col justify-center items-center p-10 gap-10">
        <h1 className="text-3xl font-bold">Mini Kanban Task Manager</h1>
        {/*<div className="flex flex-col sm:flex-row gap-14">
          <KanbanColumn tasks={tasks} title="Todo" />

          <KanbanColumn tasks={tasks} title="Done" />
        </div>*/}
        <div className="grid gap-6 md:grid-cols-2">
          <KanbanColumn
            title="To Do"
            tasks={todoTasks}
            onToggleStatus={handleUpdateTask}
            onDelete={handleDeleteTask}
          />

          <KanbanColumn
            title="Done"
            tasks={doneTasks}
            onToggleStatus={handleUpdateTask}
            onDelete={handleDeleteTask}
          />
        </div>
      </section>
    </>
  );
}

export default App;
