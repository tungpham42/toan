"use client";

import { useState } from "react";

type Solution = {
  description: string;
  roots: string[];
};

function solveQuadratic(a: number, b: number, c: number): Solution {
  const discriminant = b * b - 4 * a * c;
  const twoA = 2 * a;

  if (a === 0) {
    return {
      description: "This is not a quadratic equation (a ≠ 0).",
      roots: [],
    };
  }

  if (discriminant > 0) {
    const root1 = (-b + Math.sqrt(discriminant)) / twoA;
    const root2 = (-b - Math.sqrt(discriminant)) / twoA;
    return {
      description: "Two real and distinct roots:",
      roots: [root1.toFixed(4), root2.toFixed(4)],
    };
  } else if (discriminant === 0) {
    const root = -b / twoA;
    return {
      description: "One real root (double root):",
      roots: [root.toFixed(4)],
    };
  } else {
    const real = (-b / twoA).toFixed(4);
    const imag = (Math.sqrt(-discriminant) / twoA).toFixed(4);
    return {
      description: "Two complex roots:",
      roots: [`${real} + ${imag}i`, `${real} - ${imag}i`],
    };
  }
}

export default function QuadraticSolverPage() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [solution, setSolution] = useState<Solution | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSolve = () => {
    const na = parseFloat(a);
    const nb = parseFloat(b);
    const nc = parseFloat(c);

    if (isNaN(na) || isNaN(nb) || isNaN(nc)) {
      setError("Please enter valid numbers for a, b, and c.");
      setSolution(null);
      return;
    }

    setError(null);
    setSolution(solveQuadratic(na, nb, nc));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
            Quadratic Equation Solver
          </span>
        </h1>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 transform transition-transform duration-300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Coefficient a
              </label>
              <input
                type="number"
                value={a}
                onChange={(e) => setA(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50"
                placeholder="e.g., 1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Coefficient b
              </label>
              <input
                type="number"
                value={b}
                onChange={(e) => setB(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50"
                placeholder="e.g., -3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Coefficient c
              </label>
              <input
                type="number"
                value={c}
                onChange={(e) => setC(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50"
                placeholder="e.g., 2"
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
                {solution.roots.map((root, i) => (
                  <li key={i} className="py-1">{`x${
                    solution.roots.length > 1 ? i + 1 : ""
                  } = ${root}`}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <p className="text-center text-gray-600 text-sm">
          Solve quadratic equations of the form ax² + bx + c = 0 instantly!
        </p>
      </div>
    </div>
  );
}
