import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseCard from "./CourseCard";
import CourseAssignmentsPage from "./CourseAssignmentsPage";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState(
    JSON.parse(localStorage.getItem("courses")) || []
  );
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    //initialize defaults
    if (courses.length === 0) {
      const defaultCourses = [
        { id: 1, name: "LLM" },
        { id: 2, name: "ADS" },
        { id: 3, name: "CV" },
        { id: 4, name: "TOC" },
      ];
      setCourses(defaultCourses);
      localStorage.setItem("courses", JSON.stringify(defaultCourses));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (selectedCourse) {
    return (
      <CourseAssignmentsPage
        course={selectedCourse}
        goBack={() => setSelectedCourse(null)}
      />
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      <h3 className="text-lg font-semibold mb-4">Courses</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((c) => (
          <CourseCard key={c.id} course={c} onSelect={() => setSelectedCourse(c)} />
        ))}
      </div>
    </div>
  );
}
