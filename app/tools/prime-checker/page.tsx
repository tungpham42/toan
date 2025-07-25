"use client";

import { useState } from "react";

// Modular exponentiation (a^b mod n)
function modPow(base: bigint, exponent: bigint, modulus: bigint): bigint {
  let result = BigInt(1);
  base = base % modulus;
  while (exponent > 0) {
    if (exponent & BigInt(1)) {
      result = (result * base) % modulus;
    }
    base = (base * base) % modulus;
    exponent >>= BigInt(1);
  }
  return result;
}

// Miller-Rabin primality test
function isPrime(n: bigint): boolean {
  if (n <= BigInt(1)) return false;
  if (n <= BigInt(3)) return true;
  if (n % BigInt(2) === BigInt(0)) return false;

  // Write n-1 as 2^r * d
  let r = 0;
  let d = n - BigInt(1);
  while (d % BigInt(2) === BigInt(0)) {
    r++;
    d /= BigInt(2);
  }

  // Witness loop with common small prime bases
  const witnesses = [2, 3, 5, 7, 11, 13, 17].map(BigInt);
  for (const a of witnesses) {
    if (n === a) return true;
    if (n % a === BigInt(0)) return false;

    let x = modPow(a, d, n);
    if (x === BigInt(1) || x === n - BigInt(1)) continue;

    let composite = true;
    for (let i = 0; i < r - 1; i++) {
      x = (x * x) % n;
      if (x === n - BigInt(1)) {
        composite = false;
        break;
      }
    }
    if (composite) return false;
  }
  return true;
}

export default function PrimeCheckerPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = () => {
    // Remove any whitespace and validate input
    const cleanedInput = input.trim();

    // Check if input is a valid positive integer (including scientific notation)
    if (!/^\d+(\.\d+)?([eE][+-]?\d+)?$/.test(cleanedInput)) {
      setError("Please enter a valid non-negative integer.");
      setResult(null);
      return;
    }

    try {
      // Convert input to BigInt
      const num = BigInt(cleanedInput.replace(/\.\d+/, "")); // Remove decimal part if any
      if (num < BigInt(0)) {
        setError("Please enter a valid non-negative integer.");
        setResult(null);
        return;
      }

      setError(null);
      const prime = isPrime(num);
      setResult(`${num} is ${prime ? "a prime number ✅" : "not a prime ❌"}`);
    } catch (e) {
      console.error("Error checking prime:", e);
      setError("Number is too large or invalid.");
      setResult(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
            Prime Number Checker
          </span>
        </h1>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 transform hover:scale-[1.02] transition-transform duration-300">
          <div className="grid grid-cols-1 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter a number
              </label>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50"
                placeholder="e.g., 17 or 9191162336454672e29"
              />
            </div>
          </div>

          <button
            onClick={handleCheck}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 font-semibold shadow-lg"
          >
            Check Prime
          </button>

          {error && (
            <p className="text-red-600 mt-6 font-medium text-center">{error}</p>
          )}

          {result && !error && (
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mt-6">
              <p className="text-lg font-semibold text-gray-800">{result}</p>
            </div>
          )}
        </div>

        <p className="text-center text-gray-600 text-sm">
          Check if a number is prime instantly!
        </p>
      </div>
    </div>
  );
}
