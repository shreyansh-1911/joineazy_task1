import React, { useState, useEffect } from "react";

export default function AssignmentCard({ assignment, onEdit, onDelete }) {
  const [showDetails, setShowDetails] = useState(false);
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const submissions = assignment?.submissions ?? [];

  useEffect(() => {
    const loadData = () => {
      const latestUsers = JSON.parse(localStorage.getItem("users")) || [];
      const latestGroups = JSON.parse(localStorage.getItem("groups")) || [];
      setUsers(latestUsers);
      setGroups(latestGroups);
    };
    loadData();
    window.addEventListener("storage", loadData);
    return () => window.removeEventListener("storage", loadData);
  }, []);

  const enrolledStudents = users.filter(
    (u) =>
      Array.isArray(u.enrolledCourses) &&
      u.enrolledCourses.includes(assignment.course)
  );

  let total = 0;
  let completed = 0;
  let detailsList = [];

  // Individual Assignments
  if (assignment.type !== "Group") {
    total = enrolledStudents.length;
    completed = submissions.filter((s) =>
      enrolledStudents.some((u) => u.name === s.name)
    ).length;
    detailsList = enrolledStudents.map((u) => ({
      name: u.name,
      submitted: submissions.some((s) => s.name === u.name),
    }));
  }
  // Group Assignments
  else {
    const courseGroups = groups.filter((g) => g.course === assignment.course);
    total = courseGroups.length;

    // Mark a group as submitted if ANY member in that group has submission
    const submittedGroups = courseGroups.filter((g) =>
      g.members.some((m) => submissions.some((s) => s.name === m))
    );
    completed = submittedGroups.length;

    detailsList = courseGroups.map((g) => ({
      name: g.name,
      submitted: submittedGroups.some((sg) => sg.name === g.name),
      members: g.members,
      leader: g.leader,
    }));
  }

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

      <p className="text-sm text-gray-700 mb-2">{assignment.description}</p>

      <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
        <div
          className="bg-green-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      <p className="text-sm text-gray-600 mt-1">
        {assignment.type === "Group"
          ? `${completed}/${total} Groups Submitted`
          : `${completed}/${total} Students Submitted`}
      </p>

      {/* Submission Details */}
      {showDetails && (
        <div className="mt-3 border-t pt-3">
          <h5 className="text-sm font-semibold mb-2">
            {assignment.type === "Group"
              ? "Group Submission Status:"
              : "Student Submission Status:"}
          </h5>

          {/* For Individual Assignments */}
          {assignment.type !== "Group" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
              {detailsList.map((u) => (
                <div
                  key={u.name}
                  className="flex items-center gap-2 text-sm mb-1"
                >
                  <span
                    className={`w-3 h-3 rounded-full ${
                      u.submitted ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></span>
                  <span>{u.name}</span>
                </div>
              ))}
            </div>
          ) : (
            /* For Group Assignments */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {detailsList.map((g) => (
                <div
                  key={g.name}
                  className={`p-2 border rounded ${
                    g.submitted ? "bg-green-50" : "bg-red-50"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{g.name}</span>
                    <span
                      className={`text-xs ${
                        g.submitted ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {g.submitted ? "Submitted" : "Pending"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Leader: {g.leader}
                  </p>
                  <p className="text-xs text-gray-500">
                    Members: {g.members.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
