import React, { useState, useEffect } from "react";
import AssignmentCard from "./AssignmentCard";

export default function CourseAssignmentsPage({ course, goBack }) {
  const [assignments, setAssignments] = useState(
    JSON.parse(localStorage.getItem("assignments")) || []
  );
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [type, setType] = useState("Individual");
  const [editId, setEditId] = useState(null);
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const courseAssignments = assignments.filter((a) => a.course === course.name);

  useEffect(() => {
    localStorage.setItem("assignments", JSON.stringify(assignments));
  }, [assignments]);

  const handleSaveAssignment = () => {
    if (!title.trim() || !link.trim()) {
      alert("Please fill all fields.");
      return;
    }

    if (editId) {
      const updated = assignments.map((a) =>
        a.id === editId
          ? { ...a, title, link, description, deadline, type, course: course.name }
          : a
      );
      setAssignments(updated);
      setEditId(null);
      alert("Assignment updated!");
    } else {
      const newAssignment = {
        id: Date.now(),
        title,
        description,
        link,
        deadline: deadline.replace("T", " "),
        type,
        course: course.name,
        submissions: [],
      };
      setAssignments([...assignments, newAssignment]);
      alert("Assignment added!");
    }

    setTitle("");
    setLink("");
    setDescription("");
    setDeadline("");
    setType("Individual");
  };

  // edit assignment
  const handleEdit = (assignment) => {
    setTitle(assignment.title);
    setDescription(assignment.description);
    setLink(assignment.link);
    setDeadline(assignment.deadline);
    setType(assignment.type);
    setEditId(assignment.id);
  };


  // delete assignment
  const handleDelete = (id) => {
    if (window.confirm("Delete this assignment?")) {
      const updated = assignments.filter((a) => a.id !== id);
      setAssignments(updated);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={goBack}
          className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
        >
          ← Back
        </button>
        <h2 className="text-2xl font-bold">{course.name} - Assignments</h2>
      </div>

      {/*Create and Edit Assignment*/}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">
          {editId ? "Edit Assignment" : "Create Assignment"}
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Title"
            className="border p-2 rounded-lg w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Drive Link"
            className="border p-2 rounded-lg w-full"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <textarea
            placeholder="Description"
            className="border p-2 rounded-lg w-full md:col-span-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <input
            type="datetime-local"
            className="border p-2 rounded-lg w-full"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
          <select
            className="border p-2 rounded-lg w-full"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option>Individual</option>
            <option>Group</option>
          </select>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={handleSaveAssignment}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            {editId ? "Update" : "Add Assignment"}
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


      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Assignments for {course.name}</h3>
        {courseAssignments.length === 0 && <p>No assignments yet.</p>}
        {courseAssignments.map((assignment) => (
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
