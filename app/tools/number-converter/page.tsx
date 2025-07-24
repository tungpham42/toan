"use client";

import { useState } from "react";

export default function NumberConverterPage() {
  const [input, setInput] = useState("1010");
  const [fromBase, setFromBase] = useState("2");
  const [toBase, setToBase] = useState("10");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const baseOptions = [
    { label: "Binary (2)", value: "2" },
    { label: "Octal (8)", value: "8" },
    { label: "Decimal (10)", value: "10" },
    { label: "Hexadecimal (16)", value: "16" },
  ];

  const handleConvert = () => {
    try {
      const from = parseInt(fromBase);
      const to = parseInt(toBase);
      const parsed = parseInt(input.trim(), from);

      if (isNaN(parsed)) {
        throw new Error("Invalid number for selected base.");
      }

      const converted = parsed.toString(to).toUpperCase();
      setResult(converted);
      setError(null);
    } catch {
      setError("Invalid input or base.");
      setResult(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-emerald-50 to-green-100 min-h-screen flex flex-col">
      <h1 className="text-4xl font-extrabold mb-8 text-emerald-800 tracking-tight text-center">
        Number Base Converter
      </h1>

      <div className="mb-6">
        <label className="block font-semibold mb-2 text-emerald-700">
          Enter Number
        </label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-3 border-2 border-emerald-300 rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-200"
          placeholder="e.g., 1010"
        />
      </div>

      <div className="flex flex-col md:flex-row md:space-x-6">
        <div className="mb-6 md:mb-0">
          <label className="block font-semibold mb-2 text-emerald-700">
            From Base
          </label>
          <select
            value={fromBase}
            onChange={(e) => setFromBase(e.target.value)}
            className="w-full p-3 border-2 border-emerald-300 rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-200"
          >
            {baseOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-2 text-emerald-700">
            To Base
          </label>
          <select
            value={toBase}
            onChange={(e) => setToBase(e.target.value)}
            className="w-full p-3 border-2 border-emerald-300 rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-200"
          >
            {baseOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={handleConvert}
        className="mt-6 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transform hover:scale-105 transition duration-200 font-semibold shadow-lg mx-auto"
      >
        Convert
      </button>

      {error && (
        <p className="text-red-600 mt-6 font-medium text-center">{error}</p>
      )}

      {result && (
        <div className="mt-8 bg-white p-6 rounded-xl shadow-xl border border-emerald-200">
          <p className="text-lg font-semibold text-emerald-700">Result:</p>
          <p className="mt-2 font-mono text-xl text-gray-800">{result}</p>
        </div>
      )}
    </div>
  );
}
