console.log("HEADER LOADED");

import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext"; 

export default function Header() {
  const { user, logout } = useAuth();
  const { dark, toggleTheme } = useTheme(); 
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  // Active nav link style
  const activeStyle = "underline font-semibold text-blue-600 dark:text-blue-300";

  return (
    <header className="bg-white dark:bg-gray-800 shadow mb-4">
      <div className="max-w-6xl mx-auto p-4 flex justify-between items-center">

        {/* LEFT SIDE — NAV LINKS */}
        <div className="flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? activeStyle : "hover:underline"
            }
          >
            Team Dashboard
          </NavLink>

          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              isActive ? activeStyle : "hover:underline"
            }
          >
            Tasks
          </NavLink>

          <NavLink
            to="/team"
            className={({ isActive }) =>
              isActive ? activeStyle : "hover:underline"
            }
          >
            Team
          </NavLink>
        </div>

        {/* RIGHT SIDE — THEME TOGGLE + LOGIN/LOGOUT */}
        <div className="flex items-center gap-4">

          {/* THEME TOGGLE BUTTON */}
          <button
            onClick={toggleTheme}
            className="
              px-3 py-1 border rounded
              hover:bg-gray-100 dark:hover:bg-gray-700
              text-gray-700 dark:text-gray-200
            "
          >
            {dark ? "Light" : "Dark"}
          </button>

          {/* AUTH CONTROLS */}
          {user ? (
            <div className="flex gap-3 items-center">
              <span>{user.username}</span>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
}
