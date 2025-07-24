"use client";

import { useState } from "react";
import { derivative } from "mathjs";
import { BlockMath } from "react-katex";

export default function DifferentiatorPage() {
  const [input, setInput] = useState("x^2 + 3*x");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const compute = () => {
    try {
      const res = derivative(input, "x").toString();
      setResult(res);
      setError("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError("Error: " + err.message);
      } else {
        setError("An unknown error occurred.");
      }
      setResult("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-teal-50 to-cyan-100 min-h-screen flex flex-col">
      <h1 className="text-4xl font-extrabold mb-6 text-teal-800 tracking-tight text-center">
        Differentiator
      </h1>
      <p className="mb-6 text-gray-700 text-center">
        Provide a function of{" "}
        <code className="bg-teal-100 px-1 rounded">x</code> to compute its
        derivative symbolically. The tool supports common polynomials,
        exponentials, logs, and basic trigonometric forms.
      </p>

      <div className="mb-6">
        <label className="block font-semibold mb-2 text-teal-700">
          Enter function of x:
        </label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-3 border-2 border-teal-300 rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
          placeholder="e.g., x^3 + sin(x)"
        />
      </div>

      <button
        onClick={compute}
        className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transform hover:scale-105 transition duration-200 font-semibold shadow-lg mx-auto"
      >
        Differentiate
      </button>

      {error && (
        <p className="text-red-600 mt-6 font-medium text-center">{error}</p>
      )}

      {result && !error && (
        <div className="mt-8 bg-white p-6 rounded-xl shadow-xl border border-teal-200">
          <p className="text-lg font-semibold text-teal-700">Result:</p>
          <BlockMath math={`\\frac{{d}}{{dx}} (${input}) = ${result}`} />
        </div>
      )}
    </div>
  );
}
