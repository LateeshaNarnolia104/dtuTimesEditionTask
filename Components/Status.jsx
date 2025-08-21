import React from "react";
function StatusBadge({ status }) {
  const color = status === 1 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${color}`}>
      {status === 1 ? "Published" : "Draft"}
    </span>
  );
}
export default StatusBadge;
