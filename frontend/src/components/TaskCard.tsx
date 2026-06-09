import { ArrowRightLeft, Trash2 } from "lucide-react";
import type { Task } from "../types/tasks";

type Props = {
  task: Task;
  onToggleStatus: (task: Task) => void;
  onDelete: (id: number) => void;
};

export default function TaskCard({ task, onToggleStatus, onDelete }: Props) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex justify-end gap-1">
        <button
          onClick={() => onToggleStatus(task)}
          className="rounded p-1.5 text-gray-500 hover:bg-gray-100 hover:text-blue-600"
          title={task.status === "todo" ? "Move to Done" : "Move to To Do"}
        >
          <ArrowRightLeft size={16} />
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className="rounded p-1.5 text-gray-500 hover:bg-red-50 hover:text-red-600"
          title="Delete Task"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <p className="mt-2 break-words text-gray-800">{task.title}</p>
    </div>
  );
}
