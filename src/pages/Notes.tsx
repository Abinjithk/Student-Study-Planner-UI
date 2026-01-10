import { useState } from "react";
import Layout from "../components/Layout";

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const addNote = () => {
    if (!title || (!content && !file)) return;

    setNotes(prev => [
      ...prev,
      {
        id: Date.now(),
        title,
        content,
        file,
      },
    ]);

    setTitle("");
    setContent("");
    setFile(null);
    setShowModal(false);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Notes</h1>
            <p className="text-slate-400">All your saved notes</p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold"
          >
            ➕ Add Note
          </button>
        </div>

        {/* Notes List */}
        {notes.length === 0 ? (
          <p className="text-slate-400">No notes yet.</p>
        ) : (
          <div className="grid gap-4">
            {notes.map(note => (
              <div
                key={note.id}
                className="bg-slate-800 p-4 rounded-lg flex justify-between"
              >
                <div>
                  <h3 className="font-semibold">{note.title}</h3>
                  {note.content && (
                    <p className="text-slate-400 text-sm mt-1">
                      {note.content.slice(0, 100)}...
                    </p>
                  )}
                  {note.file && (
                    <p className="text-blue-400 text-sm mt-1">
                      📄 {note.file.name}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-slate-900 w-full max-w-md rounded-xl p-6">

              <h2 className="text-xl font-semibold mb-4">Add Note</h2>

              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full mb-3 p-2 rounded bg-slate-700 focus:outline-none"
              />

              {/* Text Note */}
              <textarea
                placeholder="Write your note..."
                value={content}
                onChange={e => setContent(e.target.value)}
                rows={4}
                className="w-full mb-3 p-2 rounded bg-slate-700 focus:outline-none"
              />

              {/* File Upload */}
              <input
                type="file"
                onChange={e => setFile(e.target.files?.[0] || null)}
                className="mb-4 text-sm"
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  onClick={addNote}
                  className="px-4 py-2 rounded bg-blue-600 font-semibold"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </Layout>
  );
};

export default Notes;
