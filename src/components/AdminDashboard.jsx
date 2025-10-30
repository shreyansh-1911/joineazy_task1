import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AssignmentCard from "./AssignmentCard";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState(
    JSON.parse(localStorage.getItem("assignments")) || []
  );
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [editId, setEditId] = useState(null);

  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Persist assignments in localStorage
  useEffect(() => {
    localStorage.setItem("assignments", JSON.stringify(assignments));
  }, [assignments]);

  // Add or Update assignment
  const handleSaveAssignment = () => {
    if (!title.trim() || !link.trim()) {
      alert("Please fill all fields.");
      return;
    }

    if (editId) {
      const updated = assignments.map((a) =>
        a.id === editId ? { ...a, title, link } : a
      );
      setAssignments(updated);
      setEditId(null);
      alert("Assignment updated!");
    } else {
      const newAssignment = {
        id: Date.now(),
        title,
        link,
        submissions: [],
      };
      setAssignments([...assignments, newAssignment]);
      alert("Assignment added!");
    }

    setTitle("");
    setLink("");
  };

  // Edit
  const handleEdit = (assignment) => {
    setTitle(assignment.title);
    setLink(assignment.link);
    setEditId(assignment.id);
  };

  // Delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      const updated = assignments.filter((a) => a.id !== id);
      setAssignments(updated);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* Create / Edit Assignment */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">
          {editId ? "Edit Assignment" : "Create Assignment"}
        </h3>
        <input
          type="text"
          placeholder="Title"
          className="border p-2 rounded-lg w-full mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Google Drive Link"
          className="border p-2 rounded-lg w-full mb-4"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <div className="flex gap-2">
          <button
            onClick={handleSaveAssignment}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            {editId ? "Update" : "Add"}
          </button>
          {editId && (
            <button
              onClick={() => {
                setEditId(null);
                setTitle("");
                setLink("");
              }}
              className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Assignments List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Assignments Overview</h3>
        {assignments.length === 0 && <p>No assignments yet.</p>}
        {assignments.map((assignment) => (
          <AssignmentCard
            key={assignment.id}
            assignment={assignment}
            users={users}
            onEdit={() => handleEdit(assignment)}
            onDelete={() => handleDelete(assignment.id)}
          />
        ))}
      </div>
    </div>
  );
}
