import { useState } from "react";

export default function TaskInput({ addTask }) {
  const [newTask, setNewTask] = useState("");

  return (
    <div className="mb-6">
      <div className="flex">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-1 border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => {
            addTask(newTask);
            setNewTask("");
          }}
          className="bg-blue-500 text-white py-2 px-4 rounded-r-lg hover:bg-blue-600 transition duration-200"
        >
          Add
        </button>
      </div>
    </div>
  );
}