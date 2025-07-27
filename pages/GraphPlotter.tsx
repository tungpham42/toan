"use client";

import { useState } from "react";
import type Plotly from "plotly.js";
import { compile } from "mathjs";
import dynamic from "next/dynamic";

// Dynamically import Plot to avoid SSR issues
const PlotComponent = dynamic(() => import("react-plotly.js"), {
  ssr: false,
});

export default function GraphPlotter() {
  const [expression, setExpression] = useState("sin(x)");
  const [xMin, setXMin] = useState(-10);
  const [xMax, setXMax] = useState(10);
  const [points] = useState(200);

  const generatePlotData = (): Partial<Plotly.PlotData>[] => {
    try {
      const compiled = compile(expression);
      const xValues: number[] = [];
      const yValues: number[] = [];

      for (let i = 0; i <= points; i++) {
        const x = xMin + ((xMax - xMin) * i) / points;
        const scope = { x };
        const y = compiled.evaluate(scope);
        xValues.push(x);
        yValues.push(typeof y === "number" ? y : NaN);
      }

      return [
        {
          x: xValues,
          y: yValues,
          type: "scatter" as const,
          mode: "lines",
          line: { color: "#8b5cf6", width: 3 },
        },
      ];
    } catch {
      return [];
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
            Graph Plotter
          </span>
        </h1>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 transform transition-transform duration-300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Function (y = f(x))
              </label>
              <input
                type="text"
                value={expression}
                onChange={(e) => setExpression(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50"
                placeholder="e.g., sin(x), x^2, cos(2*x)"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  X Min
                </label>
                <input
                  type="number"
                  value={xMin}
                  onChange={(e) => setXMin(Number(e.target.value))}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50"
                  placeholder="X min"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  X Max
                </label>
                <input
                  type="number"
                  value={xMax}
                  onChange={(e) => setXMax(Number(e.target.value))}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50"
                  placeholder="X max"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <PlotComponent
              data={generatePlotData()}
              layout={{
                title: {
                  text: `y = ${expression}`,
                  font: {
                    size: 20,
                    color: "#1f2937",
                    family: "Inter, sans-serif",
                  },
                  x: 0.5,
                  xanchor: "center",
                },
                xaxis: {
                  title: { text: "x", font: { size: 16 } },
                  gridcolor: "#e5e7eb",
                },
                yaxis: {
                  title: { text: "y", font: { size: 16 } },
                  gridcolor: "#e5e7eb",
                },
                autosize: true,
                margin: { t: 60, b: 60, l: 60, r: 60 },
                plot_bgcolor: "rgba(0,0,0,0)",
                paper_bgcolor: "rgba(0,0,0,0)",
              }}
              config={{ responsive: true }}
              style={{ width: "100%", height: "500px" }}
              className="rounded-xl"
            />
          </div>
        </div>

        <p className="text-center text-gray-600 text-sm">
          Explore functions like sin(x), x^2, or e^x with instant
          visualizations!
        </p>
      </div>
    </div>
  );
}
