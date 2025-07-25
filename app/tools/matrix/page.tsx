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
      <h2 className="text-sm font-medium text-gray-700 mb-2">{label}</h2>
      <div className="overflow-auto">
        <table className="table-auto border border-gray-200 rounded-lg">
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                {row.map((val, j) => (
                  <td key={j} className="border border-gray-200 p-1">
                    <input
                      type="number"
                      value={val}
                      onChange={(e) => {
                        const newMatrix = [...data];
                        newMatrix[i][j] = parseFloat(e.target.value) || 0;
                        onChange(newMatrix);
                      }}
                      className="w-16 px-2 py-1 text-center bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
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
    <table className="table-auto border border-gray-200 rounded-lg mt-3">
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {row.map((val, j) => (
              <td
                key={j}
                className="border border-gray-200 px-4 py-2 text-gray-800 text-center"
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
            Matrix Calculator
          </span>
        </h1>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 transform hover:scale-[1.02] transition-transform duration-300">
          <div className="grid grid-cols-1 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Operation
              </label>
              <select
                value={operation}
                onChange={(e) => setOperation(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50"
              >
                <option value="add">Addition (A + B)</option>
                <option value="multiply">Multiplication (A × B)</option>
                <option value="transpose">Transpose (Aᵗ)</option>
                <option value="inverse">Inverse (A⁻¹)</option>
                <option value="determinant">Determinant (det A)</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Matrix A size
                </label>
                <div className="flex gap-3 items-center">
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
                    className="w-20 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50 text-center"
                  />
                  <span className="text-gray-700 font-semibold">×</span>
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
                    className="w-20 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50 text-center"
                  />
                </div>
                <div className="mt-4">
                  <MatrixInput
                    label="Matrix A"
                    data={matrixA}
                    onChange={setMatrixA}
                  />
                </div>
              </div>

              {showMatrixB && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Matrix B size
                  </label>
                  <div className="flex gap-3 items-center">
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
                      className="w-20 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50 text-center"
                    />
                    <span className="text-gray-700 font-semibold">×</span>
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
                      className="w-20 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50 text-center"
                    />
                  </div>
                  <div className="mt-4">
                    <MatrixInput
                      label="Matrix B"
                      data={matrixB}
                      onChange={setMatrixB}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={calculate}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 font-semibold shadow-lg"
          >
            Calculate
          </button>

          {error && (
            <p className="text-red-600 mt-6 font-medium text-center">{error}</p>
          )}

          {result !== null && !error && (
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Result:
              </h2>
              {typeof result === "number" ? (
                <p className="text-lg font-mono text-gray-800">
                  {format(result, { precision: 6 })}
                </p>
              ) : (
                <MatrixDisplay data={result} />
              )}
            </div>
          )}
        </div>

        <p className="text-center text-gray-600 text-sm">
          Perform matrix operations like addition, multiplication, transpose,
          inverse, and determinant instantly!
        </p>
      </div>
    </div>
  );
}
