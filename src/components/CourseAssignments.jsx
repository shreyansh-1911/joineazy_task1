import React, { useState, useEffect } from "react";

export default function CourseAssignments({
  course,
  assignments,
  currentUser,
  onBack,
}) {
  const [groups, setGroups] = useState(
    JSON.parse(localStorage.getItem("groups")) || []
  );
  const [groupName, setGroupName] = useState("");
  const [userGroup, setUserGroup] = useState(null);

  useEffect(() => {
    const allGroups = JSON.parse(localStorage.getItem("groups")) || [];
    const found = allGroups.find(
      (g) => g.course === course && g.members.includes(currentUser.name)
    );
    setGroups(allGroups);
    setUserGroup(found || null);
  }, [course, currentUser.name]);

  // Create a new group
  const handleCreateGroup = () => {
    if (!groupName.trim()) return alert("Please enter a group name.");

    const existing = groups.find(
      (g) =>
        g.course === course &&
        g.name.toLowerCase() === groupName.toLowerCase()
    );
    if (existing) return alert("Group with this name already exists.");

    const newGroup = {
      course,
      name: groupName.trim(),
      leader: currentUser.name, 
      members: [currentUser.name],
    };

    const updated = [...groups, newGroup];
    localStorage.setItem("groups", JSON.stringify(updated));
    setGroups(updated);
    setUserGroup(newGroup);
    setGroupName("");
    alert(`Group "${groupName}" created successfully!`);
  };

  // Join existing group
  const handleJoinGroup = (group) => {
    if (group.members.includes(currentUser.name))
      return alert("Already in this group.");

    const updated = groups.map((g) =>
      g.course === group.course && g.name === group.name
        ? { ...g, members: [...g.members, currentUser.name] }
        : g
    );
    localStorage.setItem("groups", JSON.stringify(updated));
    setGroups(updated);
    setUserGroup({
      ...group,
      members: [...group.members, currentUser.name],
    });
    alert(`Joined group "${group.name}" successfully!`);
  };


  // Handle submission (acknowledgement)
  const handleSubmit = (assignment) => {
    if (assignment.type === "Group") {
      if (!userGroup)
        return alert("You must be in a group to acknowledge this assignment.");

      if (userGroup.leader !== currentUser.name)
        return alert("Only the group leader can acknowledge this assignment.");

      const confirm1 = window.confirm(
        `Acknowledge group submission for "${userGroup.name}"?`
      );
      if (!confirm1) return;

      const allAssignments =
        JSON.parse(localStorage.getItem("assignments")) || [];
      const updated = allAssignments.map((a) => {
        if (a.id === assignment.id) {
          const now = new Date().toLocaleString();
          userGroup.members.forEach((member) => {
            if (!a.submissions.find((s) => s.name === member)) {
              a.submissions.push({ name: member, time: now });
            }
          });
        }
        return a;
      });
      localStorage.setItem("assignments", JSON.stringify(updated));
      alert("Group submission acknowledged!");
      window.location.reload();
    } else {
      // ✅ Individual assignment logic
      const confirm1 = window.confirm("Acknowledge submission?");
      if (!confirm1) return;

      const allAssignments =
        JSON.parse(localStorage.getItem("assignments")) || [];
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
    }
  };

  const courseGroups = groups.filter((g) => g.course === course);
  const filteredAssignments = assignments.filter((a) => a.course === course);

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

      {/* ===== Group Management ===== */}
      <div className="mb-6 border p-4 rounded-lg bg-gray-50">
        <h4 className="text-lg font-semibold mb-2">👥 Group Management</h4>

        {userGroup ? (
          <div className="p-2 border rounded bg-green-50">
            <p className="font-medium text-green-700">
              You are in group: <strong>{userGroup.name}</strong>
              {userGroup.leader === currentUser.name && (
                <span className="ml-2 text-blue-600 text-sm">(Leader)</span>
              )}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Members: {userGroup.members.join(", ")}
            </p>
          </div>
        ) : (
          <>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="Enter group name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="border px-2 py-1 rounded w-1/2"
              />
              <button
                onClick={handleCreateGroup}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg"
              >
                Create Group
              </button>
            </div>

            {courseGroups.length > 0 ? (
              <div>
                <p className="font-medium text-gray-700 mb-1">Available Groups:</p>
                {courseGroups.map((g) => (
                  <div
                    key={g.name}
                    className="flex justify-between items-center border p-2 mb-1 rounded"
                  >
                    <span>
                      {g.name} ({g.members.length} members)
                    </span>
                    <button
                      onClick={() => handleJoinGroup(g)}
                      className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-sm"
                    >
                      Join
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No groups created yet.</p>
            )}
          </>
        )}
      </div>

      {/* ===== Assignments Section ===== */}
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

          const isGroupType = a.type === "Group";

          return (
            <div
              key={a.id}
              className="border p-4 rounded-lg mb-4 hover:shadow transition flex justify-between"
            >
              <div>
                <h4 className="font-bold">
                  {a.title}{" "}
                  {isGroupType && (
                    <span className="text-xs text-purple-600">(Group)</span>
                  )}
                </h4>
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

              {/* Button logic based on type */}
              {!submitted &&
                (!isGroupType ||
                  (userGroup && userGroup.leader === currentUser.name)) && (
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
