import React from "react";

export default function CoursesList({
  courses,
  enrolledCourses,
  setEnrolledCourses,
  onSelectCourse,
}) {
  const handleToggle = (courseName) => {
    if (enrolledCourses.includes(courseName)) {
      if (window.confirm(`Unenroll from ${courseName}?`)) {
        setEnrolledCourses(enrolledCourses.filter((c) => c !== courseName));
      }
    } else {
      setEnrolledCourses([...enrolledCourses, courseName]);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">🎓 Available Courses</h3>
      {courses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {courses.map((course) => {
            const enrolled = enrolledCourses.includes(course.name);
            return (
              <div
                key={course.id}
                className="border p-4 rounded-lg hover:shadow transition flex justify-between items-center"
              >
                <div>
                  <h4 className="font-semibold">{course.name}</h4>
                  <p className="text-sm text-gray-500">
                    Status:{" "}
                    {enrolled ? (
                      <span className="text-green-600 font-medium">Enrolled</span>
                    ) : (
                      <span className="text-gray-400">Not Enrolled</span>
                    )}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleToggle(course.name)}
                    className={`px-3 py-1 rounded-lg text-white ${
                      enrolled
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {enrolled ? "Unenroll" : "Enroll"}
                  </button>
                  {enrolled && (
                    <button
                      onClick={() => onSelectCourse(course.name)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg"
                    >
                      Open
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
