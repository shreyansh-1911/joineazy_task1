import React from "react";

export default function CourseAssignments({
  course,
  assignments,
  currentUser,
  onBack,
}) {
  const filteredAssignments = assignments.filter((a) => a.course === course);

  const handleSubmit = (assignment) => {
    const confirm1 = window.confirm("Acknowledge submission?");
    if (!confirm1) return;

    const allAssignments = JSON.parse(localStorage.getItem("assignments")) || [];
    const updated = allAssignments.map((a) => {
      if (a.id === assignment.id) {
        const now = new Date().toLocaleString();
        if (!a.submissions.find((s) => s.name === currentUser.name)) {
          a.submissions.push({ name: currentUser.name, time: now });
        }
      }
      return a;
    });
    localStorage.setItem("assignments", JSON.stringify(updated));
    alert("Submission acknowledged!");
    window.location.reload();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">📚 {course} Assignments</h3>
        <button
          onClick={onBack}
          className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded-lg"
        >
          ← Back
        </button>
      </div>

      {filteredAssignments.length === 0 ? (
        <p>No assignments for this course yet.</p>
      ) : (
        filteredAssignments.map((a) => {
          const submitted = a.submissions.some(
            (s) => s.name === currentUser.name
          );
          const submission = a.submissions.find(
            (s) => s.name === currentUser.name
          );

          return (
            <div
              key={a.id}
              className="border p-4 rounded-lg mb-4 hover:shadow transition flex justify-between"
            >
              <div>
                <h4 className="font-bold">{a.title}</h4>
                <p className="text-sm text-gray-600">{a.description}</p>
                <p className="text-sm text-gray-500">
                  Deadline: <strong>{a.deadline || "N/A"}</strong>
                </p>
                <a
                  href={a.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 text-sm underline"
                >
                  View Assignment
                </a>
                {submission && (
                  <p className="text-xs text-green-600 mt-1">
                    ✅ Submitted on {submission.time}
                  </p>
                )}
              </div>
              {!submitted && (
                <button
                  onClick={() => handleSubmit(a)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg"
                >
                  Acknowledge
                </button>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
