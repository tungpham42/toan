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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
            Statistics Calculator
          </span>
        </h1>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 transform transition-transform duration-300">
          <div className="grid grid-cols-1 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Numbers (separated by spaces or commas)
              </label>
              <textarea
                value={input}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleCalculate();
                  }
                }}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g., 1 2 3 4, 5.5, 6.7"
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50 h-32"
              />
            </div>
            <div>
              <button
                onClick={handleCalculate}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 font-semibold shadow-lg"
              >
                Calculate
              </button>
            </div>
          </div>

          {stats && (
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <h2 className="text-xl font-bold mb-4 text-gray-900">Results</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-gray-800">
                <li className="flex justify-between border-b border-gray-200 pb-2">
                  <strong className="text-purple-600">Count:</strong>{" "}
                  <span>{stats.count}</span>
                </li>
                <li className="flex justify-between border-b border-gray-200 pb-2">
                  <strong className="text-purple-600">Mean:</strong>{" "}
                  <span>{stats.mean.toFixed(4)}</span>
                </li>
                <li className="flex justify-between border-b border-gray-200 pb-2">
                  <strong className="text-purple-600">Median:</strong>{" "}
                  <span>{stats.median.toFixed(4)}</span>
                </li>
                <li className="flex justify-between border-b border-gray-200 pb-2">
                  <strong className="text-purple-600">Mode:</strong>{" "}
                  <span>{stats.mode.join(", ")}</span>
                </li>
                <li className="flex justify-between border-b border-gray-200 pb-2">
                  <strong className="text-purple-600">Range:</strong>{" "}
                  <span>{stats.range.toFixed(4)}</span>
                </li>
                <li className="flex justify-between border-b border-gray-200 pb-2">
                  <strong className="text-purple-600">Variance:</strong>{" "}
                  <span>{stats.variance.toFixed(4)}</span>
                </li>
                <li className="flex justify-between border-b border-gray-200 pb-2">
                  <strong className="text-purple-600">
                    Standard Deviation:
                  </strong>{" "}
                  <span>{stats.stdDev.toFixed(4)}</span>
                </li>
              </ul>
            </div>
          )}
        </div>

        <p className="text-center text-gray-600 text-sm">
          Enter numbers to calculate statistical measures instantly!
        </p>
      </div>
    </div>
  );
}
