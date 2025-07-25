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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
            Prime Factorizer
          </span>
        </h1>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 transform hover:scale-[1.02] transition-transform duration-300">
          <div className="grid grid-cols-1 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter an integer
              </label>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50"
                placeholder="e.g., 120"
              />
            </div>
          </div>

          <button
            onClick={handleFactor}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 font-semibold shadow-lg"
          >
            Factorize
          </button>

          {error && (
            <p className="text-red-600 mt-6 font-medium text-center">{error}</p>
          )}

          {result.length > 0 && !error && (
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mt-6">
              <p className="text-lg font-semibold text-gray-900">
                Prime Factors:
              </p>
              <p className="text-xl mt-2 font-mono text-gray-800">
                {result.join(" × ")}
              </p>
            </div>
          )}
        </div>

        <p className="text-center text-gray-600 text-sm">
          Find the prime factorization of any integer instantly!
        </p>
      </div>
    </div>
  );
}
