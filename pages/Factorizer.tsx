"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export default function Factorizer() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    const worker = new Worker(
      new URL("@/workers/primeWorker.ts", import.meta.url)
    );
    workerRef.current = worker;

    worker.onmessage = (e) => {
      setLoading(false);
      const data = e.data;
      if (data.error) {
        setError(data.error);
        setResult([]);
      } else {
        setError("");
        setResult(data);
      }
    };

    return () => worker.terminate();
  }, []);

  const handleFactor = useCallback(() => {
    setError("");
    setResult([]);

    const trimmed = input.trim();
    if (!/^-?\d+$/.test(trimmed)) {
      setError("Please enter a valid integer.");
      return;
    }

    setLoading(true);
    workerRef.current?.postMessage(trimmed);
  }, [input]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
            Prime Factorizer
          </span>
        </h1>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 transform transition-transform duration-300">
          <div className="mb-6">
            <label
              htmlFor="number-input"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Enter a number to factor
            </label>
            <input
              id="number-input"
              type="text"
              value={input}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleFactor();
                }
              }}
              onChange={(e) => setInput(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50"
              placeholder="e.g., 987654321987654321"
              disabled={loading}
            />
          </div>

          <button
            onClick={handleFactor}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 font-semibold shadow-lg"
          >
            {loading ? "Calculating..." : "Factorize"}
          </button>

          {error && (
            <p className="text-red-600 mt-6 font-medium text-center">{error}</p>
          )}

          {result.length > 0 && !error && (
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mt-6">
              <p className="text-lg font-semibold text-gray-900">
                Prime Factors:
              </p>
              <p className="text-xl mt-2 font-mono text-gray-800 break-words">
                {result.join(" × ")}
              </p>
            </div>
          )}
        </div>

        <p className="text-center text-gray-600 text-sm">
          Efficiently computes prime factors using background threads.
        </p>
      </div>
    </div>
  );
}
