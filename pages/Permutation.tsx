"use client";

import { useState } from "react";

export default function Permutation() {
  const [input, setInput] = useState("abc");
  const [length, setLength] = useState(3);
  const [result, setResult] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const compute = () => {
    try {
      if (!/^[a-zA-Z0-9]*$/.test(input)) {
        throw new Error("Only alphanumeric characters are allowed.");
      }
      if (length < 1 || length > input.length) {
        throw new Error("Invalid permutation length.");
      }

      setLoading(true);
      setError("");

      const worker = new Worker(
        new URL("@/workers/permutationWorker.ts", import.meta.url),
        { type: "module" }
      );

      worker.postMessage({ input, length });

      worker.onmessage = (e: MessageEvent<string[]>) => {
        setResult(e.data);
        setLoading(false);
        worker.terminate();
      };

      worker.onerror = (err) => {
        console.error(err);
        setError("Worker error occurred.");
        setLoading(false);
        worker.terminate();
      };
    } catch (err: unknown) {
      setLoading(false);
      setResult([]);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
            Permutator
          </span>
        </h1>
        <p className="mb-6 text-gray-600 text-center text-sm">
          Enter a string and length to generate permutations.
        </p>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter a string
              </label>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && compute()}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-gray-50"
                placeholder="e.g., abc"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Permutation length (r)
              </label>
              <input
                type="number"
                min={1}
                max={input.length}
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50"
              />
            </div>
          </div>

          <button
            onClick={compute}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 font-semibold shadow-lg"
          >
            {loading ? "Generating..." : "Permute"}
          </button>

          {error && (
            <p className="text-red-600 mt-6 font-medium text-center">{error}</p>
          )}

          {result.length > 0 && !error && (
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mt-6">
              <p className="text-lg font-semibold text-gray-900 mb-2">
                Result ({result.length}):
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-sm text-gray-800 max-h-96 overflow-y-auto">
                {result.map((perm, i) => (
                  <span
                    key={i}
                    className="bg-white px-2 py-1 border border-gray-300 rounded"
                  >
                    {perm}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-gray-600 text-sm">
          Generate all string permutations instantly!
        </p>
      </div>
    </div>
  );
}
