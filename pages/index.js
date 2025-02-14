import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, TASK_ABI } from "../config";
import WalletConnection from "../components/WalletConnection";
import TaskInput from "../components/TaskInput";
import TaskList from "../components/TaskList";
import DarkModeToggle from "../components/DarkModeToggle";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [walletConnected, setWalletConnected] = useState(false);

  const fetchTokenBalance = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, TASK_ABI, provider);
      const address = await signer.getAddress();
      const balance = await contract.taskToken(address);
      setTokenBalance(ethers.utils.formatUnits(balance, 18));
    } catch (error) {
      console.error("Error fetching token balance:", error);
    }
  };
  
  useEffect(() => {
    if (walletConnected) {
      fetchTokenBalance();
    }
  }, [walletConnected]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const provider = new ethers.JsonRpcProvider("https://rpc-amoy.polygon.technology");
      const contract = new ethers.Contract(CONTRACT_ADDRESS, TASK_ABI, provider);
      let index = 0;
      const tasks = [];
      
      while (true) {
        try {
          const task = await contract.tasks(index);
          tasks.push(task);
          index++;
        } catch (error) {
          break; // Break the loop when we can't fetch any more tasks
        }
      }
      
      setTasks(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const [newTask, setNewTask] = useState("");

  const addTask = async () => {
    if (!newTask) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, TASK_ABI, signer);
    const tx = await contract.addTask(newTask);
    await tx.wait();
    setNewTask("");
    fetchTasks();
  };

  const completeTask = async (taskId) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, TASK_ABI, signer);
    const tx = await contract.completeTask(taskId);
    await tx.wait();
    fetchTasks();
  };

  const deleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, TASK_ABI, signer);
      const tx = await contract.deleteTask(taskId);
      await tx.wait();
      fetchTasks();
    }
  };

  const handleWalletConnection = (status) => {
    setWalletConnected(status);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">BlockTask</h1>
            <DarkModeToggle />
          </div>
          
          <WalletConnection onConnect={handleWalletConnection} />
          
          {walletConnected && (
            <p className="mt-2 text-gray-600 dark:text-gray-300">Token Balance: {tokenBalance} TASK</p>
          )}

          {loading ? (
            <p className="text-center text-gray-500 dark:text-gray-400">Loading tasks...</p>
          ) : (
            <TaskList tasks={tasks} completeTask={completeTask} deleteTask={deleteTask} />
          )}

          <div className="mt-6">
            <input
              type="text"
              placeholder="Add a new task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              onClick={addTask} 
              className="w-full mt-3 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {loading ? "Adding..." : "Add Task"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}