import React, { useEffect, useState } from "react";
import EditionForm from "../Components/EditionForm";
import EditionTable from "../Components/EditionTable";

const API = "http://localhost:5000/editions";

function App() {
  const [editions, setEditions] = useState([]);
  const [form, setForm] = useState({
    name: "",
    edition_id: "",
    edition_link: "",
    published_at: "",
    thumbnail: "",
    status: 1,
  });
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch all editions
  useEffect(() => {
    fetch(API)
      .then(r => r.json())
      .then(setEditions);
  }, []);

  // Handlers
  const handleInput = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    const data = {
      ...form,
      edition_id: Number(form.edition_id),
      status: Number(form.status),
      published_at: form.published_at || new Date().toISOString(),
      thumbnail: form.thumbnail,
      name: form.name,
      edition_link: form.edition_link,
    };
    if (!editing) {
      fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then(res => res.json())
        .then(newEdition => setEditions([...editions, newEdition]));
    } else {
      fetch(`${API}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, _id: editId }),
      }).then(() => {
        setEditions(editions.map(e => e._id === editId ? { ...data, _id: editId } : e));
        setEditing(false);
        setEditId(null);
      });
    }
    setForm({
      name: "",
      edition_id: "",
      edition_link: "",
      published_at: "",
      thumbnail: "",
      status: 1,
    });
  };

  const handleEdit = edition => {
    setEditing(true);
    setEditId(edition._id);
    setForm({
      name: edition.name,
      edition_id: edition.edition_id,
      edition_link: edition.edition_link,
      published_at: edition.published_at?.slice(0, 10),
      thumbnail: edition.thumbnail,
      status: edition.status,
    });
  };

  const handleDelete = id => {
    fetch(`${API}/${id}`, { method: "DELETE" }).then(() =>
      setEditions(editions.filter(e => e._id !== id))
    );
  };

  const handleCancel = () => {
    setEditing(false);
    setEditId(null);
    setForm({
      name: "",
      edition_id: "",
      edition_link: "",
      published_at: "",
      thumbnail: "",
      status: 1,
    });
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center p-4">
      <div className="w-full max-w-3xl bg-gray-100 shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-6">DTU Times Editions</h1>
        <EditionForm
          form={form}
          onInput={handleInput}
          onSubmit={handleSubmit}
          editing={editing}
          onCancel={handleCancel}
        />
        <EditionTable
          editions={editions}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default App;
