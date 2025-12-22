import { useState } from "react";
import Layout from "../components/Layout";

const AiFeature: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"explain" | "summarize" | "flashcards" | "quiz">("explain");

  const handleSubmit = async () => {
    if (!input) return;
    setLoading(true);

    try {
      // TODO: Replace with actual API call
      // Example: POST /api/ai { mode, input }
      setTimeout(() => {
        setOutput(`AI (${mode}) response for: "${input}"`);
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.error(err);
      setOutput("Error generating AI response.");
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-1">🤖 AI Study Assistant</h1>
          <p className="text-slate-400">
            Explain topics, summarize notes, generate flashcards or quizzes
          </p>
        </div>

        {/* Mode Selection */}
        <div className="flex justify-center gap-3 mb-6 flex-wrap">
          {["explain", "summarize", "flashcards", "quiz"].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m as any)}
              className={`px-4 py-2 rounded-lg font-semibold ${
                mode === m ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-200 hover:bg-slate-600"
              } transition`}
            >
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>

        {/* Input Box */}
        <textarea
          placeholder={
            mode === "explain"
              ? "Enter topic to explain..."
              : mode === "summarize"
              ? "Paste notes to summarize..."
              : mode === "flashcards"
              ? "Paste notes to generate flashcards..."
              : "Enter topic to generate quiz questions..."
          }
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={6}
          className="w-full p-4 rounded-lg bg-slate-700 text-slate-200 focus:outline-none mb-4"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition"
        >
          {loading ? "Generating..." : "Generate"}
        </button>

        {/* Output */}
        {output && (
          <div className="mt-6 p-4 bg-slate-800 rounded-lg whitespace-pre-wrap text-slate-200">
            {output}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AiFeature;
