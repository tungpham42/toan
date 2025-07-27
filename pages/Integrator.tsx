"use client";

import { useState } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";
import nerdamer from "nerdamer";
import "nerdamer/Calculus";
import "nerdamer/Algebra";
import "nerdamer/Solve";
import "nerdamer/Extra";

export default function Integrator() {
  const [input, setInput] = useState("x^2 + 3*x");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const compute = () => {
    try {
      const res = nerdamer(`integrate(${input}, x)`).toString();
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

  const renderedMathML = katex.renderToString(
    `\\int (${input})\\,dx = ${result} + C`,
    {
      output: "mathml",
      throwOnError: false,
    }
  );

  return (
    <div className="min-h-screen attorno bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
            Integrator
          </span>
        </h1>
        <p className="mb-6 text-gray-600 text-center text-sm">
          Provide a function of{" "}
          <code className="bg-gray-100 px-1 rounded">x</code> to compute its
          indefinite integral symbolically. The tool supports common
          polynomials, exponentials, logs, and basic trigonometric forms.
        </p>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 transform transition-transform duration-300">
          <div className="grid grid-cols-1 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter function of x
              </label>
              <input
                type="text"
                value={input}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    compute();
                  }
                }}
                onChange={(e) => setInput(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50"
                placeholder="e.g., x^3 + sin(x)"
              />
            </div>
          </div>

          <button
            onClick={compute}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 font-semibold shadow-lg"
          >
            Integrate
          </button>

          {error && (
            <p className="text-red-600 mt-6 font-medium text-center">{error}</p>
          )}

          {result && !error && (
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mt-6">
              <p className="text-lg font-semibold text-gray-900">Result:</p>
              <div
                className="mt-6 bg-gray-50 p-4 rounded-xl border border-gray-200"
                dangerouslySetInnerHTML={{
                  __html: renderedMathML,
                }}
              />
            </div>
          )}
        </div>

        <p className="text-center text-gray-600 text-sm">
          Compute the integral of functions instantly!
        </p>
      </div>
    </div>
  );
}
