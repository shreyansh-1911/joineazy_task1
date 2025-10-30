import React from "react";

export default function ProgressBar({ value = 0 }) {
  const percent = Math.max(0, Math.min(100, value));
  return (
    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
      <div
        className="bg-gradient-to-r from-indigo-500 to-green-400 h-full rounded-full transition-all"
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
}
