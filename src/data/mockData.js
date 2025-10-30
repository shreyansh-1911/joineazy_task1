const MOCK_DATA = {
  users: [
    { id: "stu1", name: "Aman Kumar", role: "student" },
    { id: "stu2", name: "Riya Sharma", role: "student" },
    { id: "prof1", name: "Dr. Priya N.", role: "admin" },
  ],
  assignments: [
    {
      id: "a1",
      title: "DSA Assignment 1",
      description: "Solve 5 coding questions and submit via Google Drive.",
      createdBy: "prof1",
      assignedTo: ["stu1", "stu2"],
      driveLink: "https://drive.google.com/",
      dueDate: "2025-11-10",
      submissions: {
        stu1: { status: "not_submitted" },
        stu2: { status: "submitted", submittedAt: "2025-10-29T14:20:00Z" },
      },
    },
  ],
};

export default MOCK_DATA;
