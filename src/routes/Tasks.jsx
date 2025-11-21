// src/routes/Tasks.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "../context/DataContext";

const STATUSES = ["Pending", "In-Progress", "Completed"];
const PRIORITIES = ["Low", "Medium", "High"];

export default function Tasks() {
  const { tasks, addTask, toggleStatus, deleteTask, team, assignTask, setStatus } = useData();

  // UI state
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [assignedFilter, setAssignedFilter] = useState("");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 6;

  // New Task fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [status, setStatusLocal] = useState("Pending");
  const [error, setError] = useState("");

  // Reset page when filters/search change
  useEffect(() => setPage(1), [search, statusFilter, priorityFilter, assignedFilter]);

  // Filtering & search
  const filtered = useMemo(() => {
    return tasks
      .filter((t) => (search ? t.title.toLowerCase().includes(search.toLowerCase()) : true))
      .filter((t) => (statusFilter ? t.status === statusFilter : true))
      .filter((t) => (priorityFilter ? t.priority === priorityFilter : true))
      .filter((t) => (assignedFilter ? String(t.assignedTo) === String(assignedFilter) : true));
  }, [tasks, search, statusFilter, priorityFilter, assignedFilter]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Validation: Title required; dueDate not in past (if provided)
  function validateNewTask() {
    if (!title.trim()) return "Title is required";
    if (dueDate) {
      const d = new Date(dueDate);
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      if (d < now) return "Due date cannot be in the past";
    }
    return null;
  }

  function handleAdd(e) {
    e.preventDefault();
    const err = validateNewTask();
    if (err) {
      setError(err);
      return;
    }
    const newt = addTask({
      title: title.trim(),
      description: description.trim(),
      priority,
      status,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      assignedTo: assignedTo ? Number(assignedTo) : null,
    });
    // reset
    setTitle("");
    setDescription("");
    setPriority("Medium");
    setDueDate("");
    setAssignedTo("");
    setStatusLocal("Pending");
    setError("");
    // jump to page 1 to see new task
    setPage(1);
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 dark:text-gray-100">Tasks</h1>

      {/* Add Task Form */}
      <form onSubmit={handleAdd} className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="md:col-span-2 space-y-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title *"
            className="w-full p-2 rounded border bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full p-2 rounded border bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
            rows={2}
          />
        </div>

        <div className="space-y-2">
          <select value={priority} onChange={(e) => setPriority(e.target.value)} className="w-full p-2 rounded border bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
            {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>

          <select value={status} onChange={(e) => setStatusLocal(e.target.value)} className="w-full p-2 rounded border bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>

          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full p-2 rounded border bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100" />

          <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} className="w-full p-2 rounded border bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
            <option value="">Unassigned</option>
            {team.map((m) => <option key={m.id} value={m.id}>{m.name} — {m.role}</option>)}
          </select>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">Add Task</button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      </form>

      {/* Search & Filters */}
      <div className="mb-4 flex flex-col md:flex-row gap-3 items-center">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by title..." className="flex-1 p-2 rounded border bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100" />

        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="p-2 rounded border bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
          <option value="">All Statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>

        <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} className="p-2 rounded border bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
          <option value="">All Priorities</option>
          {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>

        <select value={assignedFilter} onChange={(e) => setAssignedFilter(e.target.value)} className="p-2 rounded border bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
          <option value="">All Assignees</option>
          {team.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
        </select>
      </div>

      {/* List */}
      <div className="space-y-3">
        {pageItems.map((task) => {
          const due = task.dueDate ? new Date(task.dueDate) : null;
          const overdue = due && new Date() > due && task.status !== "Completed";
          const assignee = team.find((m) => m.id === task.assignedTo);
          return (
            <div key={task.id} className={`p-4 rounded-lg shadow border bg-white dark:bg-gray-800 dark:border-gray-700 flex justify-between items-center`}>
              <div>
                <Link to={`/tasks/${task.id}`} className="font-semibold text-blue-600 dark:text-blue-300 underline">{task.title}</Link>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {task.description && <span>{task.description} · </span>}
                  <span>Priority: {task.priority}</span> · <span>Status: {task.status}</span>
                  {due && <span> · Due: {due.toLocaleDateString()}</span>}
                  {overdue && <span className="text-red-500 ml-2">Overdue</span>}
                  {assignee && <div className="mt-1 text-sm">Assigned to: {assignee.name} ({assignee.role})</div>}
                </div>
              </div>

              <div className="flex gap-2 items-center">
                <select value={task.status} onChange={(e) => setStatus(task.id, e.target.value)} className="p-2 rounded border bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>

                <select value={task.assignedTo || ""} onChange={(e) => assignTask(task.id, e.target.value ? Number(e.target.value) : null)} className="p-2 rounded border bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
                  <option value="">Unassigned</option>
                  {team.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
                </select>

                <button onClick={() => toggleStatus(task.id)} className={`px-3 py-1 rounded text-white ${task.status === "Completed" ? "bg-yellow-500" : "bg-green-600"}`}>
                  {task.status === "Completed" ? "Mark Pending" : "Complete"}
                </button>

                <button onClick={() => deleteTask(task.id)} className="px-3 py-1 rounded bg-red-600 text-white">Delete</button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-center gap-3">
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} className="px-3 py-1 border rounded" disabled={page === 1}>Prev</button>
        <div>Page {page} / {totalPages}</div>
        <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} className="px-3 py-1 border rounded" disabled={page === totalPages}>Next</button>
      </div>
    </div>
  );
}
