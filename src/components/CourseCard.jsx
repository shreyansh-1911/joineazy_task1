import React from "react";

export default function CourseCard({ course, onSelect }) {
  return (
    <div
      onClick={onSelect}
      className="border rounded-lg p-5 shadow hover:shadow-lg transition cursor-pointer bg-white"
    >
      <h3 className="text-lg font-semibold mb-2">{course.name}</h3>
      <p className="text-gray-600 text-sm">Click to view assignments</p>
    </div>
  );
}
