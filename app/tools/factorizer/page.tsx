"use client";

import { useState } from "react";

function primeFactors(n: number): number[] {
  const factors: number[] = [];
  let num = Math.abs(n);
  let divisor = 2;

  while (num >= 2) {
    if (num % divisor === 0) {
      factors.push(divisor);
      num = num / divisor;
    } else {
      divisor++;
    }
  }

  return factors;
}

export default function FactorizerPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<number[]>([]);
  const [error, setError] = useState("");

  const handleFactor = () => {
    setError("");
    const num = parseInt(input);
    if (isNaN(num)) {
      setError("Please enter a valid number.");
      setResult([]);
      return;
    }
    if (num === 0 || num === 1 || num === -1) {
      setError("0, 1, and -1 do not have prime factorizations.");
      setResult([]);
      return;
    }
    const factors = primeFactors(num);
    setResult(factors);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-blue-50 to-cyan-100 min-h-screen flex flex-col">
      <h1 className="text-4xl font-extrabold mb-8 text-blue-800 tracking-tight text-center">
        Prime Factorizer
      </h1>

      <div className="mb-6">
        <label className="block font-semibold mb-2 text-blue-700">
          Enter an integer:
        </label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-3 border-2 border-blue-300 rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          placeholder="e.g., 120"
        />
      </div>

      <button
        onClick={handleFactor}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transform hover:scale-105 transition duration-200 font-semibold shadow-lg mx-auto"
      >
        Factorize
      </button>

      {error && (
        <p className="text-red-600 mt-6 font-medium text-center">{error}</p>
      )}

      {result.length > 0 && (
        <div className="mt-8 bg-white p-6 rounded-xl shadow-xl border border-blue-200">
          <p className="text-lg font-semibold text-blue-700">Prime Factors:</p>
          <p className="text-xl mt-2 text-gray-800 font-mono">
            {result.join(" × ")}
          </p>
        </div>
      )}
    </div>
  );
}
