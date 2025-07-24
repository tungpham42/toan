"use client";

import { useState } from "react";

function mod(a: number, n: number): number {
  return ((a % n) + n) % n;
}

export default function ModCalculatorPage() {
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
    <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-rose-50 to-pink-100 min-h-screen flex flex-col">
      <h1 className="text-4xl font-extrabold mb-8 text-rose-800 tracking-tight text-center">
        Modular Calculator
      </h1>

      <div className="mb-6">
        <label className="block font-semibold mb-2 text-rose-700">
          Enter value of a:
        </label>
        <input
          type="number"
          value={a}
          onChange={(e) => setA(e.target.value)}
          className="w-full p-3 border-2 border-rose-300 rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-rose-500 transition duration-200"
          placeholder="e.g., -13"
        />
      </div>

      <div className="mb-6">
        <label className="block font-semibold mb-2 text-rose-700">
          Enter modulus n:
        </label>
        <input
          type="number"
          value={n}
          onChange={(e) => setN(e.target.value)}
          className="w-full p-3 border-2 border-rose-300 rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-rose-500 transition duration-200"
          placeholder="e.g., 5"
        />
      </div>

      <button
        onClick={handleCalculate}
        className="bg-rose-600 text-white px-6 py-3 rounded-lg hover:bg-rose-700 transform hover:scale-105 transition duration-200 font-semibold shadow-lg mx-auto"
      >
        Calculate a mod n
      </button>

      {error && (
        <p className="text-red-600 mt-6 font-medium text-center">{error}</p>
      )}

      {result !== null && !error && (
        <div className="mt-8 bg-white p-6 rounded-xl shadow-xl border border-rose-200">
          <p className="text-lg font-semibold text-rose-700">Result:</p>
          <p className="text-xl mt-2 text-gray-800">
            {a} mod {n} = <strong>{result}</strong>
          </p>
        </div>
      )}
    </div>
  );
}
