import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [assignments, setAssignments] = useState(
    JSON.parse(localStorage.getItem("assignments")) || []
  );
  const [groups, setGroups] = useState(JSON.parse(localStorage.getItem("groups")) || []);
  const [courses, setCourses] = useState(JSON.parse(localStorage.getItem("courses")) || []);
  const [selectedCourse, setSelectedCourse] = useState(
    currentUser?.course || ""
  );

  useEffect(() => {
    localStorage.setItem("assignments", JSON.stringify(assignments));
  }, [assignments]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  // 🧠 Find the student's group (if any)
  const userGroup = groups.find((g) => g.members.includes(currentUser.name));
  const isLeader = userGroup?.leader === currentUser.name;

  // 🧠 Save selected course for student
  const handleCourseChange = (e) => {
    const course = e.target.value;
    setSelectedCourse(course);

    // Update user data in localStorage
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = allUsers.map((u) =>
      u.name === currentUser.name ? { ...u, course } : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify({ ...currentUser, course }));
  };

  // ✅ Individual / Group submission acknowledgment
  const handleSubmit = (assignment) => {
    const confirm1 = confirm("Are you sure you want to acknowledge submission?");
    if (!confirm1) return;

    const updated = assignments.map((a) => {
      if (a.id === assignment.id) {
        const now = new Date().toLocaleString();

        if (a.type === "Individual") {
          if (!a.submissions.find((s) => s.name === currentUser.name)) {
            a.submissions.push({ name: currentUser.name, time: now });
          }
        } else if (a.type === "Group") {
          if (!userGroup) {
            alert("You are not part of any group!");
            return a;
          }
          if (!isLeader) {
            alert("Only group leader can acknowledge submission!");
            return a;
          }

          userGroup.members.forEach((member) => {
            if (!a.submissions.find((s) => s.name === member)) {
              a.submissions.push({
                name: member,
                time: now,
                group: userGroup.groupName,
              });
            }
          });
        }
      }
      return a;
    });

    setAssignments(updated);
    localStorage.setItem("assignments", JSON.stringify(updated));
    alert("Submission acknowledged successfully!");
  };

  // 🔹 Group creation (for demo)
  const handleCreateGroup = () => {
    const groupName = prompt("Enter new group name:");
    if (!groupName) return;
    const newGroup = {
      groupId: Date.now(),
      groupName,
      leader: currentUser.name,
      members: [currentUser.name],
    };
    const updatedGroups = [...groups, newGroup];
    setGroups(updatedGroups);
    localStorage.setItem("groups", JSON.stringify(updatedGroups));
    alert(`Group "${groupName}" created! You are the leader.`);
  };

  // 🔹 Join group
  const handleJoinGroup = () => {
    const name = prompt("Enter group name to join:");
    const group = groups.find((g) => g.groupName === name);
    if (!group) return alert("Group not found!");
    if (group.members.includes(currentUser.name))
      return alert("You are already in this group!");

    group.members.push(currentUser.name);
    const updated = groups.map((g) => (g.groupId === group.groupId ? group : g));
    setGroups(updated);
    localStorage.setItem("groups", JSON.stringify(updated));
    alert(`Joined group "${name}" successfully!`);
  };

  // 📊 Filter assignments based on selected course
  const filteredAssignments = selectedCourse
    ? assignments.filter((a) => a.course === selectedCourse)
    : assignments;

  // 📊 Progress calculation
  const totalAssignments = filteredAssignments.length;
  const completedAssignments = filteredAssignments.filter((a) =>
    a.submissions.some((s) => s.name === currentUser.name)
  ).length;
  const progress =
    totalAssignments > 0
      ? Math.round((completedAssignments / totalAssignments) * 100)
      : 0;

  return (
    <div className="p-6 min-h-screen bg-gradient-to-b from-gray-50 to-gray-200">
      {/* Header */}
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

      {/* Course Selection */}
      <div className="bg-white p-5 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">🎓 Course Enrollment</h3>
        <select
          value={selectedCourse}
          onChange={handleCourseChange}
          className="border p-2 rounded-lg w-full"
        >
          <option value="">Select Course</option>
          {courses.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
        {selectedCourse && (
          <p className="text-sm text-gray-600 mt-2">
            Enrolled in: <strong>{selectedCourse}</strong>
          </p>
        )}
      </div>

      {/* Group Section */}
      <div className="bg-white p-5 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">👥 Group Info</h3>
        {userGroup ? (
          <div className="text-sm text-gray-700">
            <p>
              <strong>Group Name:</strong> {userGroup.groupName}
            </p>
            <p>
              <strong>Leader:</strong> {userGroup.leader}
            </p>
            <p>
              <strong>Members:</strong> {userGroup.members.join(", ")}
            </p>
          </div>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={handleCreateGroup}
              className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700"
            >
              Create Group
            </button>
            <button
              onClick={handleJoinGroup}
              className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700"
            >
              Join Group
            </button>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">
          📈 Assignment Progress ({selectedCourse || "All Courses"})
        </h3>
        <div className="w-full bg-gray-300 h-3 rounded-full overflow-hidden">
          <div
            className="h-3 bg-green-500 rounded-full transition-all duration-700 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2 text-center">
          {completedAssignments}/{totalAssignments} Assignments Completed (
          {progress}%)
        </p>
      </div>

      {/* Assignments */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          📚 Assignments {selectedCourse && `(${selectedCourse})`}
        </h3>
        {filteredAssignments.length === 0 && <p>No assignments yet.</p>}
        {filteredAssignments.map((a) => {
          const submitted = a.submissions.some((s) => s.name === currentUser.name);
          const submissionData = a.submissions.find((s) => s.name === currentUser.name);

          return (
            <div
              key={a.id}
              className="border p-4 rounded-lg mb-4 flex justify-between items-center hover:shadow transition"
            >
              <div>
                <h4 className="font-bold text-gray-800">{a.title}</h4>
                <p className="text-sm text-gray-600">{a.description}</p>
                <p className="text-sm text-gray-500">
                  Deadline: <strong>{a.deadline || "N/A"}</strong>
                </p>
                <p className="text-sm">
                  Type:{" "}
                  <span
                    className={`font-semibold ${
                      a.type === "Group" ? "text-blue-600" : "text-purple-600"
                    }`}
                  >
                    {a.type}
                  </span>
                </p>
                <p className="text-sm">
                  Course:{" "}
                  <span className="font-semibold text-indigo-600">{a.course}</span>
                </p>
                <a
                  href={a.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 text-sm underline"
                >
                  View on Drive
                </a>
                {submissionData && (
                  <p className="text-xs text-green-600 mt-1">
                    ✅ Submitted on {submissionData.time}
                  </p>
                )}
              </div>

              {submitted ? (
                <p className="text-green-600 font-semibold">Submitted</p>
              ) : (
                <button
                  onClick={() => handleSubmit(a)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Acknowledge
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
