import React from "react";

function EditionForm({ form, onInput, onSubmit, editing, onCancel }) {
  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <div>
        <label className="block mb-1 font-medium">Edition Name</label>
        <input
          name="name" required
          className="border rounded px-3 py-2 w-full"
          value={form.name}
          onChange={onInput}
          placeholder="Name"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Edition ID</label>
        <input
          name="edition_id" type="number" required
          className="border rounded px-3 py-2 w-full"
          value={form.edition_id}
          onChange={onInput}
          placeholder="Edition ID"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Edition Link</label>
        <input
          name="edition_link" required
          className="border rounded px-3 py-2 w-full"
          value={form.edition_link}
          onChange={onInput}
          placeholder="Edition Link"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Thumbnail URL</label>
        <input
          name="thumbnail"
          className="border rounded px-3 py-2 w-full"
          value={form.thumbnail}
          onChange={onInput}
          placeholder="Thumbnail URL"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Published At</label>
        <input
          name="published_at" type="date"
          className="border rounded px-3 py-2 w-full"
          value={form.published_at}
          onChange={onInput}
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Status</label>
        <select name="status"
          className="border rounded px-3 py-2 w-full"
          value={form.status}
          onChange={onInput}
        >
          <option value={1}>Published</option>
          <option value={0}>Draft</option>
        </select>
      </div>
      <div className="col-span-1 md:col-span-2 flex gap-2 mt-2">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all" type="submit">
          {editing ? "Update Edition" : "Add Edition"}
        </button>
        {editing && (
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded transition-all" type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
export default EditionForm;
