"use client";

import { useState } from "react";

function isPrime(n: number): boolean {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

export default function PrimeCheckerPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = () => {
    const num = parseInt(input);
    if (isNaN(num) || num < 0) {
      setError("Please enter a valid non-negative integer.");
      setResult(null);
      return;
    }

    setError(null);
    const prime = isPrime(num);
    setResult(`${num} is ${prime ? "a prime number ✅" : "not a prime ❌"}`);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-amber-50 to-orange-100 min-h-screen flex flex-col">
      <h1 className="text-4xl font-extrabold mb-8 text-amber-800 tracking-tight text-center">
        Prime Number Checker
      </h1>

      <div className="mb-6">
        <label className="block font-semibold mb-2 text-amber-700">
          Enter a number
        </label>
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-3 border-2 border-amber-300 rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-200"
          placeholder="e.g., 17"
        />
      </div>

      <button
        onClick={handleCheck}
        className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transform hover:scale-105 transition duration-200 font-semibold shadow-lg mx-auto"
      >
        Check Prime
      </button>

      {error && (
        <p className="text-red-600 mt-6 font-medium text-center">{error}</p>
      )}

      {result && !error && (
        <div className="mt-8 bg-white p-6 rounded-xl shadow-xl border border-amber-200 text-lg text-gray-800">
          {result}
        </div>
      )}
    </div>
  );
}
