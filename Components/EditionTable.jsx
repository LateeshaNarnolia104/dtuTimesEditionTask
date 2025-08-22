import React from "react";
import StatusBadge from "./Status";
import ThumbnailImage from "./Thumbnail";

function formatDate(isoString) {
  if (!isoString) return "";
  const date = new Date(isoString);
  return date.toLocaleDateString();
}

function EditionTable({ editions, onEdit, onDelete }) {
  // Ensure we always map over an array
  const safeEditions = Array.isArray(editions) ? editions : [];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-blue-200 rounded">
            <th className="py-3 px-4 text-left">Thumbnail</th>
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-left">ID</th>
            <th className="py-3 px-4 text-left">Published</th>
            <th className="py-3 px-4 text-left">Status</th>
            <th className="py-3 px-4 text-left">Link</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {safeEditions.map(e => (
            <tr key={e._id || e.id} className="hover:bg-gray-300 transition-colors">
              <td className="py-2 px-4"><ThumbnailImage src={e.thumbnail} alt={e.name} /></td>
              <td className="py-2 px-4 font-semibold">{e.name}</td>
              <td className="py-2 px-4">{e.edition_id}</td>
              <td className="py-2 px-4">{formatDate(e.published_at)}</td>
              <td className="py-2 px-4"><StatusBadge status={e.status} /></td>
              <td className="py-2 px-4">
                <a
                  href={e.edition_link}
                  target="_blank"
                  rel="noopener noreferrer">
                  Open
                </a>
              </td>
              <td className="py-2 px-4">
                <button
                  className="mr-2 bg-yellow-100 hover:bg-yellow-200 font-medium px-2 py-1 rounded transition-all"
                  onClick={() => onEdit(e)}>Edit
                </button>
                <button
                  className="bg-red-100 hover:bg-red-200 font-medium px-2 py-1 rounded transition-all"
                  onClick={() => onDelete(e._id || e.id)}>Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {safeEditions.length === 0 && (
        <div className="text-center text-gray-400 py-8 text-lg">No editions found.</div>
      )}
    </div>
  );
}

export default EditionTable;

