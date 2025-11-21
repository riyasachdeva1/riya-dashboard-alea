import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const result = login(username, password);

    if (result.error) {
      setError(result.error);
      return;
    }

    navigate("/");
  }

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="bg-white dark:bg-gray-800 dark:text-gray-100 
                      p-8 rounded-lg shadow-lg w-96 
                      border border-gray-200 dark:border-gray-700">

        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
          Login
        </h1>

        {error && (
          <p className="text-red-500 mb-3">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300">
              Username
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded 
                         bg-gray-50 dark:bg-gray-700 
                         dark:border-gray-600 dark:text-gray-100"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              className="w-full p-2 border rounded 
                         bg-gray-50 dark:bg-gray-700 
                         dark:border-gray-600 dark:text-gray-100"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="w-full bg-blue-600 hover:bg-blue-700
                       text-white py-2 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
