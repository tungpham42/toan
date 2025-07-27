"use client";

import { useState } from "react";

type Mode = "single" | "and" | "or";

export default function Probability() {
  const [mode, setMode] = useState<Mode>("single");
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const parseProb = (val: string) => {
    const num = parseFloat(val);
    return isNaN(num) || num < 0 || num > 1 ? null : num;
  };

  const handleCalculate = () => {
    const pa = parseProb(a);
    const pb = parseProb(b);

    if (mode === "single") {
      if (pa === null) {
        setError("Enter a valid probability between 0 and 1");
        setResult(null);
        return;
      }
      setResult(pa);
      setError(null);
    }

    if (mode === "and") {
      if (pa === null || pb === null) {
        setError("Both probabilities must be between 0 and 1");
        setResult(null);
        return;
      }
      setResult(pa * pb);
      setError(null);
    }

    if (mode === "or") {
      if (pa === null || pb === null) {
        setError("Both probabilities must be between 0 and 1");
        setResult(null);
        return;
      }
      setResult(pa + pb - pa * pb);
      setError(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
            Probability Calculator
          </span>
        </h1>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 transform transition-transform duration-300">
          <div className="grid grid-cols-1 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Mode
              </label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as Mode)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50"
              >
                <option value="single">Single Event: P(A)</option>
                <option value="and">Combined: P(A and B)</option>
                <option value="or">Combined: P(A or B)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                P(A)
              </label>
              <input
                type="number"
                value={a}
                onChange={(e) => setA(e.target.value)}
                step="0.01"
                min="0"
                max="1"
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50"
                placeholder="e.g., 0.3"
              />
            </div>
            {(mode === "and" || mode === "or") && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  P(B)
                </label>
                <input
                  type="number"
                  value={b}
                  onChange={(e) => setB(e.target.value)}
                  step="0.01"
                  min="0"
                  max="1"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50"
                  placeholder="e.g., 0.5"
                />
              </div>
            )}
          </div>

          <button
            onClick={handleCalculate}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 font-semibold shadow-lg"
          >
            Calculate
          </button>

          {error && (
            <p className="text-red-600 mt-6 font-medium text-center">{error}</p>
          )}

          {result !== null && !error && (
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mt-6">
              <p className="text-lg font-semibold text-gray-900">Result:</p>
              <p className="text-xl mt-2 font-mono text-gray-800">
                {result.toFixed(4)}
              </p>
            </div>
          )}
        </div>

        <p className="text-center text-gray-600 text-sm">
          Calculate probabilities for single or combined events instantly!
        </p>
      </div>
    </div>
  );
}
