import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [assignments, setAssignments] = useState(
    JSON.parse(localStorage.getItem("assignments")) || []
  );

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const handleSubmit = (id) => {
    const confirm1 = confirm("Are you sure you submitted this assignment?");
    if (!confirm1) return;
    const confirm2 = confirm("Final confirmation?");
    if (!confirm2) return;

    const updated = assignments.map((a) => {
      if (a.id === id && !a.submissions.includes(currentUser.name)) {
        a.submissions.push(currentUser.name);
      }
      return a;
    });

    setAssignments(updated);
    localStorage.setItem("assignments", JSON.stringify(updated));
  };

  const totalAssignments = assignments.length;
  const completedAssignments = assignments.filter((a) =>
    a.submissions.includes(currentUser.name)
  ).length;
  const progress =
    totalAssignments > 0
      ? Math.round((completedAssignments / totalAssignments) * 100)
      : 0;

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Welcome, {currentUser?.name || "Student"}
        </h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2 text-gray-100">
          Assignment Progress
        </h3>

        <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
          <div
            className="h-2 bg-red-500 rounded-full transition-all duration-700 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="text-sm text-black-300 mt-2 font-medium text-center">
          {completedAssignments} / {totalAssignments} Assignments Completed (
          {progress}%)
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Assignments</h3>
        {assignments.length === 0 && <p>No assignments yet.</p>}
        {assignments.map((a) => (
          <div
            key={a.id}
            className="border p-4 rounded-lg mb-3 flex justify-between items-center hover:bg-gray-50 transition"
          >
            <div>
              <h4 className="font-bold text-gray-800">{a.title}</h4>
              <a
                href={a.link}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 text-sm underline"
              >
                View on Drive
              </a>
            </div>
            {a.submissions.includes(currentUser.name) ? (
              <p className="text-green-600 font-semibold">Submitted</p>
            ) : (
              <button
                onClick={() => handleSubmit(a.id)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Mark as Submitted
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
