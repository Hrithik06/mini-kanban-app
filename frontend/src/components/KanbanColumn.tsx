import type { Task } from "../types/tasks";
import TaskCard from "./TaskCard";

type Props = {
  title: string;
  tasks: Task[];
  onMoveTask: (task: Task) => void;
  onDelete: (id: number) => void;
  message: string;
};

export default function KanbanColumn({
  title,
  tasks,
  onMoveTask,
  onDelete,
  message,
}: Props) {
  return (
    <section className="w-full max-w-md mx-auto flex flex-col rounded-xl border border-gray-200 bg-gray-50 p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-3">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>

        <span className="rounded-full bg-white px-3 py-1 text-sm font-medium text-gray-600 shadow-sm">
          {tasks.length}
        </span>
      </div>

      <div className="flex min-h-[300px] flex-col gap-3">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onMoveTask={onMoveTask}
              onDelete={onDelete}
            />
          ))
        ) : (
          <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500">
            {message}
          </div>
        )}
      </div>
    </section>
  );
}
