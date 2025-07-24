"use client";

import { useState } from "react";

function parseNumbers(input: string): number[] {
  return input
    .split(/[\s,]+/)
    .map((s) => parseFloat(s))
    .filter((n) => !isNaN(n));
}

function calculateStats(numbers: number[]) {
  if (numbers.length === 0) return null;

  const n = numbers.length;
  const sorted = [...numbers].sort((a, b) => a - b);

  const mean = numbers.reduce((sum, val) => sum + val, 0) / n;
  const median =
    n % 2 === 0
      ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2
      : sorted[Math.floor(n / 2)];

  const frequency: Record<number, number> = {};
  for (const num of numbers) {
    frequency[num] = (frequency[num] || 0) + 1;
  }
  const maxFreq = Math.max(...Object.values(frequency));
  const mode = Object.keys(frequency)
    .filter((key) => frequency[+key] === maxFreq)
    .map(Number);

  const range = Math.max(...numbers) - Math.min(...numbers);
  const variance = numbers.reduce((sum, val) => sum + (val - mean) ** 2, 0) / n;
  const stdDev = Math.sqrt(variance);

  return {
    count: n,
    mean,
    median,
    mode,
    range,
    variance,
    stdDev,
  };
}

export default function StatisticsTool() {
  const [input, setInput] = useState("");
  const [stats, setStats] = useState<ReturnType<typeof calculateStats> | null>(
    null
  );

  const handleCalculate = () => {
    const nums = parseNumbers(input);
    setStats(calculateStats(nums));
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen flex flex-col">
      <h1 className="text-4xl font-extrabold mb-6 text-indigo-800 tracking-tight text-center">
        Statistics Calculator
      </h1>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter numbers separated by spaces or commas"
        className="w-full p-4 border-2 border-indigo-300 rounded-lg mb-6 h-40 bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
      />
      <button
        onClick={handleCalculate}
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transform hover:scale-105 transition duration-200 font-semibold shadow-lg mx-auto"
      >
        Calculate
      </button>

      {stats && (
        <div className="mt-8 bg-white p-6 rounded-xl shadow-xl border border-indigo-200">
          <h2 className="text-2xl font-bold mb-4 text-indigo-700">Results</h2>
          <ul className="space-y-3 font-mono text-gray-800">
            <li className="flex justify-between border-b border-indigo-100 pb-2">
              <strong className="text-indigo-600">Count:</strong>{" "}
              <span>{stats.count}</span>
            </li>
            <li className="flex justify-between border-b border-indigo-100 pb-2">
              <strong className="text-indigo-600">Mean:</strong>{" "}
              <span>{stats.mean.toFixed(4)}</span>
            </li>
            <li className="flex justify-between border-b border-indigo-100 pb-2">
              <strong className="text-indigo-600">Median:</strong>{" "}
              <span>{stats.median.toFixed(4)}</span>
            </li>
            <li className="flex justify-between border-b border-indigo-100 pb-2">
              <strong className="text-indigo-600">Mode:</strong>{" "}
              <span>{stats.mode.join(", ")}</span>
            </li>
            <li className="flex justify-between border-b border-indigo-100 pb-2">
              <strong className="text-indigo-600">Range:</strong>{" "}
              <span>{stats.range.toFixed(4)}</span>
            </li>
            <li className="flex justify-between border-b border-indigo-100 pb-2">
              <strong className="text-indigo-600">Variance:</strong>{" "}
              <span>{stats.variance.toFixed(4)}</span>
            </li>
            <li className="flex justify-between border-b border-indigo-100 pb-2">
              <strong className="text-indigo-600">Standard Deviation:</strong>{" "}
              <span>{stats.stdDev.toFixed(4)}</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
