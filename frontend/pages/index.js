import { useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { CONTRACT_ADDRESS } from "../config";
import BlockTask from "../abi/BlockTask.json";
import DarkModeToggle from "../components/DarkModeToggle";
import WalletConnection from "../components/WalletConnection";
import TaskList from "../components/TaskList";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [newTask, setNewTask] = useState("");

  const connectWallet = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    return signer;
  };

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const provider = new ethers.JsonRpcProvider("https://rpc-amoy.polygon.technology");
      const contract = new ethers.Contract(CONTRACT_ADDRESS, BlockTask.abi, provider);
      const taskCount = await contract.taskCount();
      const tasks = [];
      for (let i = 0; i < taskCount; i++) {
        const task = await contract.tasks(i);
        tasks.push(task);
      }
      setTasks(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async () => {
    if (!newTask) return;
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, BlockTask.abi, signer);
      const tx = await contract.addTask(newTask);
      await tx.wait();
      setNewTask("");
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleWalletConnection = async (signer) => {
    setWalletConnected(true);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, BlockTask.abi, signer);
    const balance = await signer.getBalance();
    const tokenBalance = ethers.formatEther(balance);
    setTokenBalance(tokenBalance);
  };

  const completeTask = async (taskId) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, BlockTask.abi, signer);
      const tx = await contract.completeTask(taskId);
      await tx.wait();
      fetchTasks();
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  const deleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, BlockTask.abi, signer);
        const tx = await contract.deleteTask(taskId);
        await tx.wait();
        fetchTasks();
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="container mx-auto max-w-2xl">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">BlockTask</h1>
            <DarkModeToggle />
          </div>
          
          <WalletConnection onConnect={handleWalletConnection} />
          
          {walletConnected && (
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Token Balance: {tokenBalance} TASK
            </p>
          )}

          {loading ? (
            <div className="mt-6 text-center text-gray-500 dark:text-gray-400">
              Loading tasks...
            </div>
          ) : (
            <TaskList tasks={tasks} completeTask={completeTask} deleteTask={deleteTask} />
          )}

          <div className="mt-6">
            <input
              type="text"
              placeholder="Add a new task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              onClick={addTask} 
              className="w-full mt-3 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg transition-colors duration-200"
            >
              {loading ? "Adding..." : "Add Task"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}