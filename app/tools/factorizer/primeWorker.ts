const ctx: Worker = self as unknown as Worker;

// Optimized square root function using Newton's method
function sqrt(n: bigint): bigint {
  if (n < 0n) throw new Error("sqrt of negative");
  if (n < 2n) return n;
  let x = n >> 1n;
  while (true) {
    const next = (x + n / x) >> 1n;
    if (next >= x) return x;
    x = next;
  }
}

// Miller-Rabin primality test for quick prime check
function isPrime(n: bigint): boolean {
  if (n < 2n) return false;
  if (n === 2n || n === 3n) return true;
  if (n % 2n === 0n) return false;

  // Write n-1 as 2^r * d
  let r = 0n;
  let d = n - 1n;
  while (d % 2n === 0n) {
    r++;
    d /= 2n;
  }

  // Test with small bases (optimized for speed)
  const bases = [2n, 3n, 5n, 7n];
  for (const a of bases) {
    if (a >= n) continue;
    let x = modPow(a, d, n);
    if (x === 1n || x === n - 1n) continue;
    let isComposite = true;
    for (let i = 0n; i < r - 1n; i++) {
      x = (x * x) % n;
      if (x === n - 1n) {
        isComposite = false;
        break;
      }
    }
    if (isComposite) return false;
  }
  return true;
}

// Modular exponentiation for Miller-Rabin
function modPow(base: bigint, exp: bigint, mod: bigint): bigint {
  let result = 1n;
  base = base % mod;
  while (exp > 0n) {
    if (exp & 1n) result = (result * base) % mod;
    base = (base * base) % mod;
    exp >>= 1n;
  }
  return result;
}

// Expanded small primes list
const SMALL_PRIMES = [
  2n,
  3n,
  5n,
  7n,
  11n,
  13n,
  17n,
  19n,
  23n,
  29n,
  31n,
  37n,
  41n,
  43n,
  47n,
  53n,
  59n,
  61n,
  67n,
  71n,
  73n,
  79n,
  83n,
  89n,
  97n,
  101n,
  103n,
  107n,
  109n,
  113n,
  127n,
  131n,
  137n,
  139n,
  149n,
  151n,
  157n,
  163n,
  167n,
  173n,
  179n,
  181n,
  191n,
  193n,
  197n,
  199n,
];

// Larger wheel pattern (based on 2,3,5,7,11) for better skipping
const WHEEL = [
  2n,
  4n,
  2n,
  4n,
  6n,
  2n,
  6n,
  4n,
  2n,
  4n,
  6n,
  6n,
  2n,
  6n,
  4n,
  2n,
  6n,
  4n,
  6n,
  8n,
  4n,
  2n,
  4n,
  2n,
  4n,
  8n,
  6n,
  4n,
  6n,
  2n,
  6n,
  6n,
  4n,
  2n,
  4n,
  6n,
  2n,
  6n,
  4n,
  2n,
  4n,
  6n,
  6n,
  2n,
  6n,
  4n,
  2n,
  6n,
  4n,
  6n,
  8n,
];
const WHEEL_OFFSET = 211n;

function primeFactors(n: bigint): bigint[] {
  const factors: bigint[] = [];
  let num = n < 0n ? -n : n;

  // Handle small primes
  for (const prime of SMALL_PRIMES) {
    while (num % prime === 0n) {
      factors.push(prime);
      num /= prime;
    }
    if (num === 1n) return factors;
  }

  if (num < WHEEL_OFFSET * WHEEL_OFFSET) {
    if (num > 1n) factors.push(num);
    return factors;
  }

  // Check if remaining number is prime
  if (isPrime(num)) {
    factors.push(num);
    return factors;
  }

  const max = sqrt(num);
  let divisor = WHEEL_OFFSET;
  let wheelIndex = 0;

  // Wheel factorization
  while (divisor <= max && num > 1n) {
    while (num % divisor === 0n) {
      factors.push(divisor);
      num /= divisor;
      if (isPrime(num)) {
        factors.push(num);
        return factors;
      }
    }
    divisor += WHEEL[wheelIndex];
    wheelIndex = (wheelIndex + 1) % WHEEL.length;
  }

  if (num > 1n) factors.push(num);
  return factors;
}

ctx.onmessage = (e: MessageEvent) => {
  try {
    const input = BigInt(e.data);
    const result = primeFactors(input);
    ctx.postMessage(result.map((f) => f.toString()));
  } catch {
    ctx.postMessage({ error: "Invalid input or too large" });
  }
};
