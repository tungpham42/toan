"use client";

import { useState } from "react";

type Mode = "single" | "and" | "or";

export default function ProbabilityPage() {
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
    <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-purple-50 to-violet-100 min-h-screen flex flex-col">
      <h1 className="text-4xl font-extrabold mb-8 text-purple-800 tracking-tight text-center">
        Probability Calculator
      </h1>

      <div className="mb-6">
        <label className="block font-semibold mb-2 text-purple-700">
          Select Mode
        </label>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value as Mode)}
          className="w-full p-3 border-2 border-purple-300 rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
        >
          <option value="single">Single Event: P(A)</option>
          <option value="and">Combined: P(A and B)</option>
          <option value="or">Combined: P(A or B)</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block font-semibold mb-2 text-purple-700">P(A)</label>
        <input
          type="number"
          value={a}
          onChange={(e) => setA(e.target.value)}
          step="0.01"
          min="0"
          max="1"
          className="w-full p-3 border-2 border-purple-300 rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
          placeholder="e.g. 0.3"
        />
      </div>

      {(mode === "and" || mode === "or") && (
        <div className="mb-6">
          <label className="block font-semibold mb-2 text-purple-700">
            P(B)
          </label>
          <input
            type="number"
            value={b}
            onChange={(e) => setB(e.target.value)}
            step="0.01"
            min="0"
            max="1"
            className="w-full p-3 border-2 border-purple-300 rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
            placeholder="e.g. 0.5"
          />
        </div>
      )}

      <button
        onClick={handleCalculate}
        className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transform hover:scale-105 transition duration-200 font-semibold shadow-lg mx-auto"
      >
        Calculate
      </button>

      {error && (
        <p className="text-red-600 mt-6 font-medium text-center">{error}</p>
      )}

      {result !== null && !error && (
        <div className="mt-8 bg-white p-6 rounded-xl shadow-xl border border-purple-200">
          <p className="text-lg font-semibold text-purple-700">Result:</p>
          <p className="text-xl mt-2 font-mono text-gray-800">
            {result.toFixed(4)}
          </p>
        </div>
      )}
    </div>
  );
}
