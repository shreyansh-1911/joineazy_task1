import React from "react";

export default function AssignmentCard({ assignment, users, onEdit, onDelete }) {
  const submissionCount = assignment.submissions.length;
  const totalStudents = users.length;
  const progress =
    totalStudents > 0 ? ((submissionCount / totalStudents) * 100).toFixed(0) : 0;

  return (
    <div className="border p-3 rounded-lg mb-3">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-bold">{assignment.title}</h4>
          <a
            href={assignment.link}
            className="text-blue-600 text-sm"
            target="_blank"
            rel="noreferrer"
          >
            Drive Link
          </a>
          <p className="text-sm mt-2">
            Submitted by: {submissionCount} / {totalStudents} students
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
