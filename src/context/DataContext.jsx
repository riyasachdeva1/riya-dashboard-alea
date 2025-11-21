// src/context/DataContext.jsx
console.log("DATA CONTEXT LOADED");

import React, { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext();

const STORAGE_TASKS = "tm_tasks_v1";
const STORAGE_TEAM = "tm_team_v1";

export function DataProvider({ children }) {

  // TEAM: load from storage or default
  const [team, setTeam] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_TEAM);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return [
      { id: 1, name: "Riya", role: "Project Manager", email: "riya@example.com" },
      { id: 2, name: "Alex", role: "Frontend Developer", email: "alex@example.com" },
      { id: 3, name: "Sara", role: "UI/UX Designer", email: "sara@example.com" },
    ];
  });

  // TASKS with priority, status, dueDate, assignedTo, comments, activity log
  const [tasks, setTasks] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_TASKS);
      if (raw) return JSON.parse(raw);
    } catch (e) {}

    const now = Date.now();

    return [
      {
        id: 1,
        title: "Design login page",
        description: "Create login screen and validation",
        priority: "High",
        status: "Pending",
        dueDate: new Date(now + 3 * 24 * 60 * 60 * 1000).toISOString(),
        assignedTo: 1,
        comments: [],
        activity: [
          {
            when: new Date().toISOString(),
            text: "Task created",
            status: "Pending",
          },
        ],
      },
      {
        id: 2,
        title: "Fix dashboard layout",
        description: "Align cards and spacing",
        priority: "Medium",
        status: "Completed",
        dueDate: new Date(now - 2 * 24 * 60 * 60 * 1000).toISOString(),
        assignedTo: 2,
        comments: [],
        activity: [
          {
            when: new Date().toISOString(),
            text: "Task created",
            status: "Completed",
          },
        ],
      },
      {
        id: 3,
        title: "Update team photos",
        description: "Replace placeholder avatars",
        priority: "Low",
        status: "In-Progress",
        dueDate: new Date(now + 7 * 24 * 60 * 60 * 1000).toISOString(),
        assignedTo: 3,
        comments: [],
        activity: [
          {
            when: new Date().toISOString(),
            text: "Task created",
            status: "In-Progress",
          },
        ],
      },
    ];
  });

  // Persist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_TASKS, JSON.stringify(tasks));
    } catch {}
  }, [tasks]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_TEAM, JSON.stringify(team));
    } catch {}
  }, [team]);

  // -------- TASK APIs --------
  function addTask({ title, description = "", priority, status, dueDate, assignedTo }) {
    const newTask = {
      id: Date.now(),
      title,
      description,
      priority,
      status,
      dueDate,
      assignedTo,
      comments: [],
      activity: [
        {
          when: new Date().toISOString(),
          text: "Task created",
          status,
        },
      ],
    };

    setTasks((prev) => [newTask, ...prev]);
    return newTask;
  }

  function updateTask(id, patch) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function toggleStatus(id) {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const nextStatus = t.status === "Completed" ? "Pending" : "Completed";

        return {
          ...t,
          status: nextStatus,
          activity: [
            ...t.activity,
            {
              when: new Date().toISOString(),
              text: `Status changed to ${nextStatus}`,
              status: nextStatus,
            },
          ],
        };
      })
    );
  }

  function setStatus(id, status) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status,
              activity: [
                ...t.activity,
                {
                  when: new Date().toISOString(),
                  text: `Status changed to ${status}`,
                  status,
                },
              ],
            }
          : t
      )
    );
  }

  function addComment(taskId, text) {
    if (!text.trim()) return;

    setTasks((prev) =>
      prev.map((t) =>
        t.id !== taskId
          ? t
          : {
              ...t,
              comments: [
                ...t.comments,
                { id: Date.now(), text: text.trim(), when: new Date().toISOString() },
              ],
              activity: [
                ...t.activity,
                { when: new Date().toISOString(), text: "Comment added", status: t.status },
              ],
            }
      )
    );
  }

  function assignTask(taskId, memberId) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id !== taskId
          ? t
          : {
              ...t,
              assignedTo: memberId,
              activity: [
                ...t.activity,
                {
                  when: new Date().toISOString(),
                  text: `Assigned to member ${memberId}`,
                  status: t.status,
                },
              ],
            }
      )
    );
  }

  // -------- TEAM APIs --------
  function addMember(name, role, email) {
    if (!name.trim() || !role.trim() || !email.trim()) return null;

    const newMember = {
      id: Date.now(),
      name: name.trim(),
      role: role.trim(),
      email: email.trim(),
    };

    setTeam((prev) => [newMember, ...prev]);
    return newMember;
  }

  function removeMember(id) {
    setTeam((prev) => prev.filter((m) => m.id !== id));
    setTasks((prev) => prev.map((t) => (t.assignedTo === id ? { ...t, assignedTo: null } : t)));
  }

  function getOverdueTasks() {
    const now = new Date();
    return tasks.filter(
      (t) => t.dueDate && new Date(t.dueDate) < now && t.status !== "Completed"
    );
  }

  return (
    <DataContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        toggleStatus,
        setStatus,
        addComment,
        assignTask,
        team,
        addMember,
        removeMember,
        getOverdueTasks,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
