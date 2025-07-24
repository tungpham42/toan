"use client";

import { useState } from "react";
import { matrix, evaluate, det, inv, transpose, format } from "mathjs";

type MatrixData = number[][];

function createEmptyMatrix(rows: number, cols: number): MatrixData {
  return Array.from({ length: rows }, () => Array(cols).fill(0));
}

function MatrixInput({
  label,
  data,
  onChange,
}: {
  label: string;
  data: MatrixData;
  onChange: (updated: MatrixData) => void;
}) {
  return (
    <div>
      <h2 className="font-semibold mb-3 text-purple-700 text-lg">{label}</h2>
      <div className="overflow-auto">
        <table className="table-auto border-2 border-purple-200">
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                {row.map((val, j) => (
                  <td key={j} className="border border-purple-100 px-2 py-1">
                    <input
                      type="number"
                      value={val}
                      onChange={(e) => {
                        const newMatrix = [...data];
                        newMatrix[i][j] = parseFloat(e.target.value) || 0;
                        onChange(newMatrix);
                      }}
                      className="w-20 px-2 py-1 text-center bg-white border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MatrixDisplay({ data }: { data: MatrixData }) {
  return (
    <table className="table-auto border-2 border-purple-200 mt-3">
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {row.map((val, j) => (
              <td
                key={j}
                className="border border-purple-100 px-4 py-2 text-gray-800 text-center"
              >
                {format(val, { precision: 4 })}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function MatrixPage() {
  const [rowsA, setRowsA] = useState(2);
  const [colsA, setColsA] = useState(2);
  const [rowsB, setRowsB] = useState(2);
  const [colsB, setColsB] = useState(2);

  const [matrixA, setMatrixA] = useState<MatrixData>(createEmptyMatrix(2, 2));
  const [matrixB, setMatrixB] = useState<MatrixData>(createEmptyMatrix(2, 2));

  const [operation, setOperation] = useState("add");
  const [result, setResult] = useState<MatrixData | number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const updateSize = (
    setRows: React.Dispatch<React.SetStateAction<number>>,
    setCols: React.Dispatch<React.SetStateAction<number>>,
    setMatrix: React.Dispatch<React.SetStateAction<MatrixData>>,
    rows: number,
    cols: number
  ) => {
    setRows(rows);
    setCols(cols);
    setMatrix(createEmptyMatrix(rows, cols));
  };

  const calculate = () => {
    try {
      const A = matrix(matrixA);
      const B = matrix(matrixB);

      let output: MatrixData | number;
      switch (operation) {
        case "add":
          output = evaluate("A + B", { A, B }).toArray();
          break;
        case "multiply":
          output = evaluate("A * B", { A, B }).toArray();
          break;
        case "transpose":
          {
            const transResult = transpose(A).toArray();
            output = Array.isArray(transResult[0])
              ? (transResult as number[][])
              : [transResult as number[]];
          }
          break;
        case "inverse":
          {
            const invResult = inv(A).toArray();
            output = Array.isArray(invResult[0])
              ? (invResult as number[][])
              : [invResult as number[]];
          }
          break;
        case "determinant":
          output = det(A);
          break;
        default:
          throw new Error("Unsupported operation");
      }

      setResult(output);
      setError(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError("Error: " + err.message);
      } else {
        setError("An unknown error occurred");
      }
      setResult(null);
    }
  };

  const showMatrixB = operation === "add" || operation === "multiply";

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gradient-to-br from-purple-50 to-violet-100 min-h-screen flex flex-col">
      <h1 className="text-4xl font-extrabold mb-8 text-purple-800 tracking-tight text-center">
        Matrix Calculator
      </h1>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <label className="block font-semibold mb-2 text-purple-700">
            Matrix A size:
          </label>
          <div className="flex gap-3 mb-3 items-center">
            <input
              type="number"
              value={rowsA}
              min={1}
              max={5}
              onChange={(e) =>
                updateSize(
                  setRowsA,
                  setColsA,
                  setMatrixA,
                  +e.target.value,
                  colsA
                )
              }
              className="w-20 p-2 border-2 border-purple-300 rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200 text-center"
            />
            <span className="text-purple-700 font-semibold">×</span>
            <input
              type="number"
              value={colsA}
              min={1}
              max={5}
              onChange={(e) =>
                updateSize(
                  setRowsA,
                  setColsA,
                  setMatrixA,
                  rowsA,
                  +e.target.value
                )
              }
              className="w-20 p-2 border-2 border-purple-300 rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200 text-center"
            />
          </div>
          <MatrixInput label="Matrix A" data={matrixA} onChange={setMatrixA} />
        </div>

        {showMatrixB && (
          <div>
            <label className="block font-semibold mb-2 text-purple-700">
              Matrix B size:
            </label>
            <div className="flex gap-3 mb-3 items-center">
              <input
                type="number"
                value={rowsB}
                min={1}
                max={5}
                onChange={(e) =>
                  updateSize(
                    setRowsB,
                    setColsB,
                    setMatrixB,
                    +e.target.value,
                    colsB
                  )
                }
                className="w-20 p-2 border-2 border-purple-300 rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200 text-center"
              />
              <span className="text-purple-700 font-semibold">×</span>
              <input
                type="number"
                value={colsB}
                min={1}
                max={5}
                onChange={(e) =>
                  updateSize(
                    setRowsB,
                    setColsB,
                    setMatrixB,
                    rowsB,
                    +e.target.value
                  )
                }
                className="w-20 p-2 border-2 border-purple-300 rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200 text-center"
              />
            </div>
            <MatrixInput
              label="Matrix B"
              data={matrixB}
              onChange={setMatrixB}
            />
          </div>
        )}
      </div>

      <div className="mb-6">
        <label className="block font-semibold mb-2 text-purple-700">
          Operation:
        </label>
        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
          className="w-full p-3 border-2 border-purple-300 rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
        >
          <option value="add">Addition (A + B)</option>
          <option value="multiply">Multiplication (A × B)</option>
          <option value="transpose">Transpose (Aᵗ)</option>
          <option value="inverse">Inverse (A⁻¹)</option>
          <option value="determinant">Determinant (det A)</option>
        </select>
      </div>

      <button
        onClick={calculate}
        className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transform hover:scale-105 transition duration-200 font-semibold shadow-lg mx-auto"
      >
        Calculate
      </button>

      {error && (
        <p className="text-red-600 mt-6 font-medium text-center">{error}</p>
      )}

      {result !== null && (
        <div className="mt-8 bg-white p-6 rounded-xl shadow-xl border border-purple-200">
          <h2 className="font-semibold mb-3 text-purple-700 text-lg">
            Result:
          </h2>
          {typeof result === "number" ? (
            <p className="text-lg text-gray-800">
              {format(result, { precision: 6 })}
            </p>
          ) : (
            <MatrixDisplay data={result} />
          )}
        </div>
      )}
    </div>
  );
}
