import { useState } from "react";
import Layout from "../components/Layout";

interface Note {
  id: number;
  title: string;
  content: string;
}

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");

  const addNote = () => {
    if (!title || !content) return;

    setNotes([
      ...notes,
      { id: Date.now(), title, content },
    ]);

    setTitle("");
    setContent("");
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const filteredNotes = notes.filter(
    note =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-1">Notes</h1>
          <p className="text-slate-400">
            Create, search, and organize your study notes.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">

          {/* Add Note */}
          <div className="bg-slate-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">➕ New Note</h2>

            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full p-2 rounded mb-3 bg-slate-700 focus:outline-none"
            />

            <textarea
              placeholder="Content"
              value={content}
              onChange={e => setContent(e.target.value)}
              rows={5}
              className="w-full p-2 rounded mb-3 bg-slate-700 focus:outline-none"
            />

            <button
              onClick={addNote}
              className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-lg py-2 font-semibold"
            >
              Add Note
            </button>
          </div>

          {/* Notes List */}
          <div className="lg:col-span-2 bg-slate-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">📝 Your Notes</h2>

            <input
              type="text"
              placeholder="Search notes..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full p-2 rounded mb-4 bg-slate-700 focus:outline-none"
            />

            {filteredNotes.length === 0 ? (
              <p className="text-slate-400">No notes found.</p>
            ) : (
              <ul className="space-y-3">
                {filteredNotes.map(note => (
                  <li key={note.id} className="bg-slate-700 rounded-lg p-4 flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{note.title}</h3>
                      <p className="text-slate-400 text-sm mt-1">{note.content}</p>
                    </div>
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="ml-4 text-red-500 hover:text-red-400 font-semibold"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Notes;
