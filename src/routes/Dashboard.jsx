// src/routes/Dashboard.jsx
console.log("DASHBOARD LOADED");

import { useData } from "../context/DataContext";

export default function Dashboard() {
  const { tasks, team, getOverdueTasks } = useData();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "Completed").length;
  const pendingTasks = tasks.filter((t) => t.status === "Pending").length;
  const inProgress = tasks.filter((t) => t.status === "In-Progress").length;
  const overdueTasks = getOverdueTasks().length;
  const teamCount = team.length;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 dark:text-gray-100">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
        <div className="p-6 bg-blue-500 text-white rounded shadow">
          <h2 className="text-lg">Total Tasks</h2>
          <p className="text-3xl font-bold mt-2">{totalTasks}</p>
        </div>

        <div className="p-6 bg-green-500 text-white rounded shadow">
          <h2 className="text-lg">Completed</h2>
          <p className="text-3xl font-bold mt-2">{completedTasks}</p>
        </div>

        <div className="p-6 bg-yellow-500 text-white rounded shadow">
          <h2 className="text-lg">Pending</h2>
          <p className="text-3xl font-bold mt-2">{pendingTasks}</p>
        </div>

        <div className="p-6 bg-indigo-500 text-white rounded shadow">
          <h2 className="text-lg">In-Progress</h2>
          <p className="text-3xl font-bold mt-2">{inProgress}</p>
        </div>

        <div className="p-6 bg-red-600 text-white rounded shadow">
          <h2 className="text-lg">Overdue</h2>
          <p className="text-3xl font-bold mt-2">{overdueTasks}</p>
        </div>

        <div className="p-6 bg-purple-500 text-white rounded shadow">
          <h2 className="text-lg">Team Members</h2>
          <p className="text-3xl font-bold mt-2">{teamCount}</p>
        </div>
      </div>
    </div>
  );
}
