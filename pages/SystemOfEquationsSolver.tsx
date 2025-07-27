"use client";

import { useState } from "react";

type Solution = {
  description: string;
  values: string[];
};

function solveSystem(
  a1: number,
  b1: number,
  c1: number,
  a2: number,
  b2: number,
  c2: number
): Solution {
  const D = a1 * b2 - a2 * b1;
  const Dx = c1 * b2 - c2 * b1;
  const Dy = a1 * c2 - a2 * c1;

  if (D === 0) {
    if (Dx === 0 && Dy === 0) {
      return {
        description: "The system has infinitely many solutions (dependent).",
        values: [],
      };
    } else {
      return {
        description: "The system has no solution (inconsistent).",
        values: [],
      };
    }
  }

  const x = Dx / D;
  const y = Dy / D;

  return {
    description: "Unique solution found:",
    values: [`x = ${x.toFixed(4)}`, `y = ${y.toFixed(4)}`],
  };
}

export default function SystemOfEquationsSolver() {
  const [a1, setA1] = useState("");
  const [b1, setB1] = useState("");
  const [c1, setC1] = useState("");
  const [a2, setA2] = useState("");
  const [b2, setB2] = useState("");
  const [c2, setC2] = useState("");
  const [solution, setSolution] = useState<Solution | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSolve = () => {
    const na1 = parseFloat(a1);
    const nb1 = parseFloat(b1);
    const nc1 = parseFloat(c1);
    const na2 = parseFloat(a2);
    const nb2 = parseFloat(b2);
    const nc2 = parseFloat(c2);

    if ([na1, nb1, nc1, na2, nb2, nc2].some(isNaN)) {
      setError("Please enter valid numbers for all coefficients.");
      setSolution(null);
      return;
    }

    setError(null);
    setSolution(solveSystem(na1, nb1, nc1, na2, nb2, nc2));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
            System of Equations Solver
          </span>
        </h1>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 transform transition-transform duration-300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                a₁
              </label>
              <input
                type="number"
                value={a1}
                onChange={(e) => setA1(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                b₁
              </label>
              <input
                type="number"
                value={b1}
                onChange={(e) => setB1(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                c₁
              </label>
              <input
                type="number"
                value={c1}
                onChange={(e) => setC1(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                a₂
              </label>
              <input
                type="number"
                value={a2}
                onChange={(e) => setA2(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                b₂
              </label>
              <input
                type="number"
                value={b2}
                onChange={(e) => setB2(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                c₂
              </label>
              <input
                type="number"
                value={c2}
                onChange={(e) => setC2(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <button
            onClick={handleSolve}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 font-semibold shadow-lg"
          >
            Solve
          </button>

          {error && (
            <p className="text-red-600 mt-6 font-medium text-center">{error}</p>
          )}

          {solution && !error && (
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mt-6">
              <p className="font-semibold text-gray-900 text-lg mb-3">
                {solution.description}
              </p>
              <ul className="mt-2 list-disc list-inside font-mono text-gray-800">
                {solution.values.map((val, i) => (
                  <li key={i} className="py-1">
                    {val}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <p className="text-center text-gray-600 text-sm">
          Solve 2-variable systems of the form a₁x + b₁y = c₁ and a₂x + b₂y =
          c₂.
        </p>
      </div>
    </div>
  );
}
