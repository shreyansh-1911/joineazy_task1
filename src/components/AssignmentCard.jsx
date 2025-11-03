import React, { useState, useEffect } from "react";

export default function AssignmentCard({ assignment, onEdit, onDelete }) {
  const [showDetails, setShowDetails] = useState(false);
  const [users, setUsers] = useState([]);
  const submissions = assignment?.submissions ?? [];

  // ✅ Always fetch latest users data every time component mounts or localStorage changes
  useEffect(() => {
    const loadUsers = () => {
      const latestUsers = JSON.parse(localStorage.getItem("users")) || [];
      setUsers(latestUsers);
    };
    loadUsers();

    // Optional: Listen for any storage updates (like student enrolling)
    window.addEventListener("storage", loadUsers);
    return () => window.removeEventListener("storage", loadUsers);
  }, []);

  // ✅ Only students enrolled in this assignment’s course
  const enrolledStudents = users.filter(
    (u) => u.role === "student" && Array.isArray(u.enrolledCourses) && u.enrolledCourses.includes(assignment.course)
  );

  const total = enrolledStudents.length;
  const completed = submissions.filter((s) =>
    enrolledStudents.some((u) => u.name === s.name)
  ).length;

  const percentage = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div
      className="border rounded-lg p-4 mb-4 hover:shadow-lg transition relative bg-gray-50"
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
    >
      {/* Title & Actions */}
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-semibold text-lg">{assignment.title}</h4>
          <p className="text-sm text-gray-500">
            Course: <span className="font-medium">{assignment.course}</span>
          </p>
          <p className="text-sm text-gray-500">
            Type: <span className="font-medium">{assignment.type}</span>
          </p>
          <p className="text-sm text-gray-500">
            Deadline:{" "}
            <span className="font-medium">
              {assignment.deadline
                ? new Date(assignment.deadline).toLocaleString()
                : "N/A"}
            </span>
          </p>
          <a
            href={assignment.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-sm"
          >
            View Assignment
          </a>
        </div>

        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-700 mb-2">{assignment.description}</p>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
        <div
          className="bg-green-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-600 mt-1">
        {completed}/{total} Submitted
      </p>

      {/* Submission Details */}
      {showDetails && (
        <div className="mt-3 border-t pt-3">
          <h5 className="text-sm font-semibold mb-2">Submission Status:</h5>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
            {enrolledStudents.map((u) => {
              const hasSubmitted = submissions.some((s) => s.name === u.name);
              return (
                <div key={u.name} className="flex items-center gap-2 text-sm mb-1">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      hasSubmitted ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></span>
                  <span>{u.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
