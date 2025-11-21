// src/routes/Team.jsx
import React, { useState } from "react";
import { useData } from "../context/DataContext";

export default function Team() {
  const { team, addMember, removeMember } = useData();

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");

  function handleAdd(e) {
    e.preventDefault();
    addMember(name, role, email);
    setName("");
    setRole("");
    setEmail("");
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 dark:text-gray-100">Team Members</h1>

      <form onSubmit={handleAdd} className="mb-6 grid grid-cols-1 sm:grid-cols-4 gap-3">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="p-2 rounded border bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100" />
        <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role (e.g. Developer)" className="p-2 rounded border bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="p-2 rounded border bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100" />
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Add</button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((member) => (
          <div key={member.id} className="p-4 border rounded shadow bg-white dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold dark:text-gray-100">{member.name}</h2>
                <p className="text-gray-700 dark:text-gray-300"><strong>Role:</strong> {member.role}</p>
                <p className="text-gray-700 dark:text-gray-300"><strong>Email:</strong> {member.email}</p>
              </div>
              <button onClick={() => removeMember(member.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
