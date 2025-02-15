export default function TaskList({ tasks, completeTask, deleteTask }) {
  return (
    <ul className="mt-6 space-y-3">
      {tasks.map((task) => (
        <li 
          key={task.id.toString()} 
          className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition duration-200"
        >
          <span className={`${
            task.completed 
              ? "line-through text-gray-400 dark:text-gray-500" 
              : "text-gray-800 dark:text-white"
          }`}>
            {task.content}
          </span>
          <div className="flex space-x-3">
            <button 
              onClick={() => completeTask(task.id)}
              className="px-3 py-1 text-sm text-green-500 hover:text-green-600 transition duration-200"
            >
              {task.completed ? "Completed" : "Complete"}
            </button>
            <button 
              onClick={() => deleteTask(task.id)}
              className="px-3 py-1 text-sm text-red-500 hover:text-red-600 transition duration-200"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
} 