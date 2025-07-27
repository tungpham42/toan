"use client";

import { useState } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";
import nerdamer from "nerdamer";
import "nerdamer/Algebra";
import "nerdamer/Solve";
import "nerdamer/Calculus";
import "nerdamer/Extra";

export default function EquationSolver() {
  const [input, setInput] = useState("2x + 3 = 7");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const extractVariable = (expression: string): string => {
    const match = expression.match(/[a-zA-Z]+/g);
    const knownFunctions = [
      "sin",
      "cos",
      "tan",
      "cot",
      "log",
      "ln",
      "exp",
      "sqrt",
      "abs",
      "pi",
      "e",
    ];
    const variable = match?.find((v) => !knownFunctions.includes(v)) || "x";
    return variable;
  };

  const formatToLatex = (expr: string): string => {
    return expr
      .replace(/pi/g, "\\pi")
      .replace(/sqrt\(([^)]+)\)/g, "\\sqrt{$1}")
      .replace(/log\(/g, "\\log(")
      .replace(/ln\(/g, "\\ln(")
      .replace(/abs\(([^)]+)\)/g, "\\left|$1\\right|")
      .replace(/exp\(([^)]+)\)/g, "e^{$1}")
      .replace(
        /^([^/]+)\/([^/]+)$/,
        (_match, num, den) => `\\frac{${num}}{${den}}`
      );
  };

  const formatResult = (raw: string, variable: string): string => {
    return raw
      .replace(/[\[\]]/g, "")
      .split(",")
      .map((r) => {
        const expr = formatToLatex(r.trim());
        return `${variable} = ${expr}`;
      })
      .join(", ");
  };

  const compute = () => {
    try {
      const [lhs, rhs] = input.split("=");
      if (!lhs || !rhs) throw new Error("Equation must include '='");

      const equation = `${lhs.trim()}=(${rhs.trim()})`;
      const variable = extractVariable(lhs);
      const rawResult = nerdamer.solve(equation, variable).toString();

      if (!rawResult || rawResult === "[]") {
        throw new Error("No solution found");
      }

      const finalResult = formatResult(rawResult, variable);
      setResult(finalResult);
      setError("");
    } catch (err) {
      setError("Error: " + (err as Error).message);
      setResult("");
    }
  };

  const renderedMathML = katex.renderToString(result, {
    output: "mathml",
    throwOnError: false,
  });

  return (
    <div className="min-h-screen attorno bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
            Equation Solver
          </span>
        </h1>
        <p className="mb-6 text-gray-600 text-center text-sm">
          Provide an equation with{" "}
          <code className="bg-gray-100 px-1 rounded">x</code>. Supported
          functions: <code>sin</code>, <code>cos</code>, <code>tan</code>,{" "}
          <code>cot</code>, <code>log</code>, <code>sqrt</code>, <code>pi</code>
          , and more.
        </p>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter an equation
            </label>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && compute()}
              className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
              placeholder="e.g., 2x + 3 = 7"
            />
          </div>

          <button
            onClick={compute}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 font-semibold shadow-lg"
          >
            Solve
          </button>

          {error && (
            <p className="text-red-600 mt-6 font-medium text-center">{error}</p>
          )}

          {result && !error && (
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mt-6">
              <p className="text-lg font-semibold text-gray-900">Result:</p>
              <div
                className="mt-6 p-4 bg-white rounded-lg border border-gray-200 overflow-x-auto break-words"
                dangerouslySetInnerHTML={{ __html: renderedMathML }}
              />
            </div>
          )}
        </div>

        <p className="text-center text-gray-600 text-sm">
          Example: <code>2x + 3 = 7</code> → <code>x = 2</code>
        </p>
      </div>
    </div>
  );
}
