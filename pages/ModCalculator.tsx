"use client";

import { useState } from "react";

function mod(a: number, n: number): number {
  return ((a % n) + n) % n;
}

export default function ModCalculator() {
  const [a, setA] = useState("");
  const [n, setN] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");

  const handleCalculate = () => {
    const numA = parseInt(a);
    const numN = parseInt(n);

    if (isNaN(numA) || isNaN(numN)) {
      setError("Please enter valid integers for both a and n.");
      setResult(null);
      return;
    }

    if (numN === 0) {
      setError("Modulus n cannot be 0.");
      setResult(null);
      return;
    }

    setError("");
    setResult(mod(numA, numN));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
            Modular Calculator
          </span>
        </h1>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 transform transition-transform duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter value of a
              </label>
              <input
                type="number"
                value={a}
                onChange={(e) => setA(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50"
                placeholder="e.g., -13"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter modulus n
              </label>
              <input
                type="number"
                value={n}
                onChange={(e) => setN(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50"
                placeholder="e.g., 5"
              />
            </div>
          </div>

          <button
            onClick={handleCalculate}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 font-semibold shadow-lg"
          >
            Calculate a mod n
          </button>

          {error && (
            <p className="text-red-600 mt-6 font-medium text-center">{error}</p>
          )}

          {result !== null && !error && (
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mt-6">
              <p className="text-lg font-semibold text-gray-900">Result:</p>
              <p className="text-xl mt-2 font-mono text-gray-800">
                {a} mod {n} = <strong>{result}</strong>
              </p>
            </div>
          )}
        </div>

        <p className="text-center text-gray-600 text-sm">
          Calculate modular arithmetic (a mod n) instantly!
        </p>
      </div>
    </div>
  );
}
