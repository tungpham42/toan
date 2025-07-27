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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
            Number Base Converter
          </span>
        </h1>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 transform transition-transform duration-300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter Number
              </label>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50"
                placeholder="e.g., 1010"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                From Base
              </label>
              <select
                value={fromBase}
                onChange={(e) => setFromBase(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50"
              >
                {baseOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                To Base
              </label>
              <select
                value={toBase}
                onChange={(e) => setToBase(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50"
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
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 font-semibold shadow-lg"
          >
            Convert
          </button>

          {error && (
            <p className="text-red-600 mt-6 font-medium text-center">{error}</p>
          )}

          {result && !error && (
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mt-6">
              <p className="text-lg font-semibold text-gray-900">Result:</p>
              <p className="text-xl mt-2 font-mono text-gray-800">{result}</p>
            </div>
          )}
        </div>

        <p className="text-center text-gray-600 text-sm">
          Convert numbers between binary, octal, decimal, and hexadecimal
          instantly!
        </p>
      </div>
    </div>
  );
}
