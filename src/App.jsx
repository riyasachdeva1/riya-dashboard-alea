import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./routes/Dashboard";
import Tasks from "./routes/Tasks";
import TaskDetails from "./routes/TaskDetails";
import Team from "./routes/Team";
import Login from "./routes/Login";
import NotFound from "./routes/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 dark:text-gray-100">

      <Header />

      <main className="p-4 max-w-6xl mx-auto flex-grow">
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={user ? <Dashboard /> : <Navigate to="/login" replace />}
          />

          <Route
            path="/tasks"
            element={user ? <Tasks /> : <Navigate to="/login" replace />}
          />

          <Route
            path="/tasks/:id"
            element={user ? <TaskDetails /> : <Navigate to="/login" replace />}
          />

          <Route
            path="/team"
            element={user ? <Team /> : <Navigate to="/login" replace />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />

    </div>
  );
}
