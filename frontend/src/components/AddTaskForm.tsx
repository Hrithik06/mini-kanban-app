import { useState } from "react";

type Props = {
  onAdd: (title: string) => void;
};
export default function AddTaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setIsEmpty(true);
      return;
    }
    onAdd(title.trim());
    setTitle("");
    setIsEmpty(false);
  }
  return (
    <div className="mx-auto flex flex-col max-w-2xl">
      <form className="flex items-start gap-3" onSubmit={handleSubmit}>
        <input
          id="newTaskId"
          name="newTask"
          type="text"
          placeholder="What needs to be done?"
          className={`flex-1 rounded-lg border px-4 py-2.5 ${
            isEmpty ? "border-red-400" : "border-gray-300"
          }`}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (isEmpty) setIsEmpty(false);
          }}
        />

        <button
          type="submit"
          className="rounded-lg bg-violet-600 px-5 py-2.5 text-white hover:bg-violet-700"
        >
          Add
        </button>
      </form>

      <p
        className={`mt-2 ml-2 text-xs text-red-500 ${
          isEmpty ? "visible" : "invisible"
        }`}
      >
        *Task title cannot be empty
      </p>
    </div>
  );
}
