import { useState, useEffect } from "react";
import Layout from "../components/Layout";


const MAIN_API_URL = import.meta.env.VITE_FAST_API_URL;

interface Note {
  _id: string; // changed to match MongoDB _id
  title: string;
  subject: string;
  content?: string;
  file_url?: string;
}

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // Validation errors
  const [titleError, setTitleError] = useState("");
  const [subjectError, setSubjectError] = useState("");
  const [contentError, setContentError] = useState("");

  // Accordion state
  const [openNoteId, setOpenNoteId] = useState<string | null>(null);

  const API_URL = `${MAIN_API_URL}/user`; // your backend URL

  // Fetch notes from backend
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`${API_URL}/get_notes`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch notes");
        const data = await response.json();
        setNotes(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNotes();
  }, []);

  const handleAddNote = async () => {
    let valid = true;

    setTitleError("");
    setSubjectError("");
    setContentError("");

    if (!title.trim()) {
      setTitleError("Note title is required.");
      valid = false;
    }

    if (!subject.trim()) {
      setSubjectError("Subject name is required.");
      valid = false;
    }

    if (!content.trim() && !file) {
      setContentError("Either note text or file must be provided.");
      valid = false;
    }

    if (!valid) return;

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("subject", subject);
      formData.append("content", content);
      // file upload not implemented yet
      // if (file) formData.append("file", file);
      if (file) {
      formData.append("file", file);
    }

      const response = await fetch(`${API_URL}/create_notes`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || "Failed to save note");
      }

      const savedNote = await response.json();
      setNotes((prev) => [...prev, savedNote]);

      // Reset form
      setTitle("");
      setSubject("");
      setContent("");
      setFile(null);
      setShowModal(false);
    } catch (error: any) {
      console.error("Error saving note:", error.message);
    }
  };

  // Delete note
  const handleDeleteNote = async (noteId: string) => {
    if (!confirm("Are you sure you want to delete this note?")) return;
    try {
      const response = await fetch(`${API_URL}/delete_notes/${noteId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) throw new Error("Failed to delete note");
      setNotes((prev) => prev.filter((note) => note._id !== noteId));
    } catch (err) {
      console.error(err);
      alert("Error deleting note");
    }
  };

  const toggleNote = (id: string) => {
    setOpenNoteId(openNoteId === id ? null : id);
  };

  // Group notes by subject
  const notesBySubject = notes.reduce((acc: Record<string, Note[]>, note) => {
    if (!acc[note.subject]) acc[note.subject] = [];
    acc[note.subject].push(note);
    return acc;
  }, {});

  const handleDownload = (url: string) => {
  let filename = url.split("/").pop() || "file";

  // Infer extension from Cloudinary URL
  if (!filename.includes(".")) {
    // You can inspect URL or default
    if (url.includes(".pdf")) filename += ".pdf";
    else if (url.includes(".docx")) filename += ".docx";
    else if (url.includes(".zip")) filename += ".zip";
    else filename += ".bin"; // fallback
  }

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">My Notes</h1>
            <p className="text-slate-400">All your saved notes</p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold transition"
          >
            ➕ Add Note
          </button>
        </div>

        {/* Notes List */}
        {notes.length === 0 ? (
          <p className="text-slate-400">No notes yet.</p>
        ) : (
          <div className="space-y-6">
            {Object.keys(notesBySubject).map((subject) => (
              <div key={subject}>
                <h2 className="text-xl font-bold text-blue-400 mb-2">{subject}</h2>

                <div className="space-y-2">
                  {notesBySubject[subject].map((note) => (
                    <div
                      key={note._id}
                      className="bg-slate-800 rounded-lg shadow-md overflow-hidden"
                    >
                      {/* Accordion Header */}
                      <div className="flex justify-between items-center">
                        <button
                          onClick={() => toggleNote(note._id)}
                          className="w-full text-left px-4 py-3 flex justify-between items-center hover:bg-slate-700 transition"
                        >
                          <span className="font-semibold text-white">{note.title}</span>
                          <span className="text-slate-400">{openNoteId === note._id ? "▲" : "▼"}</span>
                        </button>

                        <button
                          onClick={() => handleDeleteNote(note._id)}
                          className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded-r-lg"
                        >
                          Delete
                        </button>
                      </div>

                      {/* Accordion Content */}
                      {openNoteId === note._id && (
                        <div className="px-4 py-3 border-t border-slate-700 text-slate-300">
                          {note.content && <p className="mb-2">{note.content}</p>}

                          {note.file_url && (
                           <button
  onClick={() => handleDownload(note.file_url!)}
  className="text-blue-400 underline"
>
  📄 View File
</button>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
            <div className="bg-slate-900 w-full max-w-md rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 text-white">Add Note</h2>

              {/* Title */}
              <input
                type="text"
                placeholder="Note Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full mb-3 p-3 rounded bg-slate-700 text-white
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                            ${titleError ? "border border-red-500" : ""}`}
              />
              {titleError && <p className="text-red-400 text-xs mb-2">{titleError}</p>}

              {/* Subject */}
              <input
                type="text"
                placeholder="Subject Name"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className={`w-full mb-3 p-3 rounded bg-slate-700 text-white
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                            ${subjectError ? "border border-red-500" : ""}`}
              />
              {subjectError && <p className="text-red-400 text-xs mb-2">{subjectError}</p>}

              {/* Content */}
              <textarea
                placeholder="Write your note..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                className={`w-full mb-3 p-3 rounded bg-slate-700 text-white
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                            ${contentError ? "border border-red-500" : ""}`}
              />
              {contentError && <p className="text-red-400 text-xs mb-2">{contentError}</p>}

              {/* File Upload */}
              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="mb-4 text-sm text-white"
              />

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded bg-slate-700 hover:bg-slate-600 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddNote}
                  className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 font-semibold transition"
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
