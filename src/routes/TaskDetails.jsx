// src/routes/TaskDetails.jsx
import { useParams, Link } from "react-router-dom";
import { useData } from "../context/DataContext";
import React, { useState } from "react";

export default function TaskDetails() {
  const { id } = useParams();
  const { tasks, addComment, setStatus, assignTask, team } = useData();
  const task = tasks.find((t) => t.id === Number(id));
  const [comment, setComment] = useState("");

  if (!task) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4 dark:text-gray-100">Task Not Found</h1>
        <Link to="/tasks" className="text-blue-600 underline">Back to Tasks</Link>
      </div>
    );
  }

  function handleAddComment(e) {
    e.preventDefault();
    addComment(task.id, comment);
    setComment("");
  }

  return (
    <div>
      <Link to="/tasks" className="text-blue-600 underline">← Back to Tasks</Link>

      <h1 className="text-3xl font-bold mt-4 mb-2 dark:text-gray-100">{task.title}</h1>

      <div className="mb-4 text-sm text-gray-700 dark:text-gray-300">
        <div><strong>Status:</strong> {task.status}</div>
        <div><strong>Priority:</strong> {task.priority}</div>
        <div><strong>Due:</strong> {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "—"}</div>
        <div><strong>Assigned:</strong> {task.assignedTo ? (team.find((m) => m.id === task.assignedTo)?.name || "—") : "Unassigned"}</div>
        <div className="mt-2"><strong>Description:</strong> {task.description || "No description provided"}</div>
      </div>

      <div className="flex gap-3 mb-6">
        <select value={task.status} onChange={(e) => setStatus(task.id, e.target.value)} className="p-2 rounded border bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
          <option>Pending</option>
          <option>In-Progress</option>
          <option>Completed</option>
        </select>

        <select value={task.assignedTo || ""} onChange={(e) => assignTask(task.id, e.target.value ? Number(e.target.value) : null)} className="p-2 rounded border bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
          <option value="">Unassigned</option>
          {team.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
        </select>
      </div>

      <hr className="my-4" />

      {/* Comments */}
      <h2 className="text-2xl font-bold mb-3 dark:text-gray-100">Comments</h2>
      <form onSubmit={handleAddComment} className="flex gap-3 mb-4">
        <input value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write a comment..." className="flex-1 p-2 rounded border bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
      </form>

      <div className="space-y-3 mb-6">
        {(task.comments || []).length === 0 && <p className="text-gray-500 dark:text-gray-300">No comments yet.</p>}
        {(task.comments || []).map((c) => (
          <div key={c.id} className="p-3 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded shadow">
            <div className="text-sm text-gray-500 dark:text-gray-400">{new Date(c.when).toLocaleString()}</div>
            <div className="mt-1">{c.text}</div>
          </div>
        ))}
      </div>

      {/* Activity log */}
      <h2 className="text-2xl font-bold mb-3 dark:text-gray-100">Activity</h2>
      <div className="space-y-2">
        {(task.activity || []).slice().reverse().map((a, idx) => (
          <div key={idx} className="text-sm text-gray-700 dark:text-gray-300">
            <div><strong>{a.status || ""}</strong> — {a.text}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{new Date(a.when).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
