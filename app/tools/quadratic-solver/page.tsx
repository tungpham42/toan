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
    <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-teal-50 to-cyan-100 min-h-screen flex flex-col">
      <h1 className="text-4xl font-extrabold mb-8 text-teal-800 tracking-tight text-center">
        Quadratic Equation Solver
      </h1>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div>
          <label className="block font-semibold mb-2 text-teal-700">a</label>
          <input
            type="number"
            value={a}
            onChange={(e) => setA(e.target.value)}
            className="w-full p-3 border-2 border-teal-300 rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
            placeholder="e.g. 1"
          />
        </div>
        <div>
          <label className="block font-semibold mb-2 text-teal-700">b</label>
          <input
            type="number"
            value={b}
            onChange={(e) => setB(e.target.value)}
            className="w-full p-3 border-2 border-teal-300 rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
            placeholder="e.g. -3"
          />
        </div>
        <div>
          <label className="block font-semibold mb-2 text-teal-700">c</label>
          <input
            type="number"
            value={c}
            onChange={(e) => setC(e.target.value)}
            className="w-full p-3 border-2 border-teal-300 rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
            placeholder="e.g. 2"
          />
        </div>
      </div>

      <button
        onClick={handleSolve}
        className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transform hover:scale-105 transition duration-200 font-semibold shadow-lg mx-auto"
      >
        Solve
      </button>

      {error && (
        <p className="text-red-600 mt-6 font-medium text-center">{error}</p>
      )}

      {solution && !error && (
        <div className="mt-8 bg-white p-6 rounded-xl shadow-xl border border-teal-200">
          <p className="font-semibold text-teal-700 text-lg mb-3">
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
  );
}
