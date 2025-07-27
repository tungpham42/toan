"use client";

import { useState } from "react";

function getArrangements(str: string, r: number): string[] {
  if (r > str.length || r <= 0) return [];

  const results: string[] = [];

  const generate = (current: string, remaining: string) => {
    if (current.length === r) {
      results.push(current);
      return;
    }

    for (let i = 0; i < remaining.length; i++) {
      generate(
        current + remaining[i],
        remaining.slice(0, i) + remaining.slice(i + 1)
      );
    }
  };

  generate("", str);
  return results;
}

export default function Arrangement() {
  const [input, setInput] = useState("abcd");
  const [r, setR] = useState(2);
  const [result, setResult] = useState<string[]>([]);
  const [error, setError] = useState("");

  const compute = () => {
    try {
      if (!/^[a-zA-Z0-9]*$/.test(input)) {
        throw new Error("Only alphanumeric characters are allowed.");
      }
      if (r <= 0 || r > input.length) {
        throw new Error(
          "Arrangement length must be between 1 and the string length."
        );
      }
      const arrangements = getArrangements(input, r);
      setResult(arrangements);
      setError("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError("Error: " + err.message);
      } else {
        setError("An unknown error occurred.");
      }
      setResult([]);
    }
  };

  return (
    <div className="min-h-screen attorno bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
            Arranger
          </span>
        </h1>
        <p className="mb-6 text-gray-600 text-center text-sm">
          Enter a string and choose an arrangement length to list all r-length
          permutations (without repetition).
        </p>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 transform transition-transform duration-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter a string
              </label>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    compute();
                  }
                }}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50"
                placeholder="e.g., abcd"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Arrangement length (r)
              </label>
              <input
                type="number"
                value={r}
                min={1}
                max={input.length}
                onChange={(e) => setR(Number(e.target.value))}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50"
              />
            </div>
          </div>

          <button
            onClick={compute}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 font-semibold shadow-lg"
          >
            Arrange
          </button>

          {error && (
            <p className="text-red-600 mt-6 font-medium text-center">{error}</p>
          )}

          {result.length > 0 && !error && (
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mt-6">
              <p className="text-lg font-semibold text-gray-900 mb-2">
                Result:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-sm text-gray-800">
                {result.map((arr, i) => (
                  <span
                    key={i}
                    className="bg-white px-2 py-1 border border-gray-300 rounded"
                  >
                    {arr}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-gray-600 text-sm">
          Discover all possible arrangements of your input!
        </p>
      </div>
    </div>
  );
}
