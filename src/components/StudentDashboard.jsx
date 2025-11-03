import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CoursesList from "./CoursesList";
import CourseAssignments from "./CourseAssignments";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("currentUser"));
  const allUsers = JSON.parse(localStorage.getItem("users")) || [];
  const syncedUser = allUsers.find((u) => u.name === storedUser?.name) || storedUser;

  const [currentUser, setCurrentUser] = useState(syncedUser);
  const [assignments, setAssignments] = useState(
    JSON.parse(localStorage.getItem("assignments")) || []
  );
  const [courses, setCourses] = useState(
    JSON.parse(localStorage.getItem("courses")) || []
  );
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState(
    syncedUser?.enrolledCourses || []
  );

  // 🧠 Persist enrolled courses to users & currentUser
  useEffect(() => {
    if (!currentUser) return;
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = allUsers.map((u) =>
      u.name === currentUser.name ? { ...u, enrolledCourses } : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    const updatedUser = { ...currentUser, enrolledCourses };
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    setCurrentUser(updatedUser);
  }, [enrolledCourses]);

  // 🚪 Logout — keep user data safe before removing currentUser
  const handleLogout = () => {
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = allUsers.map((u) =>
      u.name === currentUser.name ? { ...u, enrolledCourses } : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Welcome, {currentUser?.name}
        </h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Toggle between courses list and assignments */}
      {!selectedCourse ? (
        <CoursesList
          courses={courses}
          enrolledCourses={enrolledCourses}
          setEnrolledCourses={setEnrolledCourses}
          onSelectCourse={(course) => setSelectedCourse(course)}
        />
      ) : (
        <CourseAssignments
          course={selectedCourse}
          assignments={assignments}
          currentUser={currentUser}
          onBack={() => setSelectedCourse(null)}
        />
      )}
    </div>
  );
}
