export default function formatExpressions(expr: string): string {
  let formatted = expr;

  // 1. Replace a/b with \frac{a}{b}
  formatted = formatted.replace(
    /(\b[\d\w]+)\s*\/\s*([\d\w]+\b)/g,
    (_, num, den) => `\\frac{${num}}{${den}}`
  );

  // 2. Remove surrounding parentheses on \frac
  formatted = formatted.replace(/\(\\frac\{[^}]+\}\{[^}]+\}\)/g, (match) =>
    match.slice(1, -1)
  );

  // 3. Replace * with \cdot
  formatted = formatted.replace(/\*/g, "\\cdot ");

  // 4. sqrt and nth root
  formatted = formatted
    .replace(/sqrt\(([^)]+)\)/g, (_, radicand) => `\\sqrt{${radicand}}`)
    .replace(/√(\w+)/g, (_, radicand) => `\\sqrt{${radicand}}`)
    .replace(
      /root\(([^,]+),\s*([^)]+)\)/g,
      (_, n, radicand) => `\\sqrt[${n}]{${radicand}}`
    );

  // 5. pi and π
  formatted = formatted.replace(/\bpi\b|π/g, "\\pi");

  // 6. Exponentiation: a^b or (a+b)^c
  formatted = formatted.replace(
    /(\w+|\([^()]+\))\s*\^\s*(\w+|\([^()]+\))/g,
    (_, base, exp) => `${base}^{${exp}}`
  );

  // 7. log and ln
  formatted = formatted.replace(/ln\(([^)]+)\)/g, (_, arg) => `\\ln{${arg}}`);
  formatted = formatted.replace(/log\(([^)]+)\)/g, (_, arg) => `\\log{${arg}}`);

  // 8. Absolute value
  formatted = formatted.replace(
    /abs\(([^)]+)\)/g,
    (_, arg) => `\\left|${arg}\\right|`
  );

  // 9. Trig functions
  formatted = formatted.replace(
    /\b(sin|cos|tan|sec|csc|cot)\(([^)]+)\)/g,
    (_, fn, arg) => `\\${fn}{${arg}}`
  );

  // 10. Inverse trig functions
  formatted = formatted.replace(
    /\b(arcsin|arccos|arctan)\(([^)]+)\)/g,
    (_, fn, arg) => {
      const base = fn.replace("arc", "");
      return `\\${base}^{-1}{${arg}}`;
    }
  );

  // 11. Modulo function
  formatted = formatted.replace(
    /\bmod\(([^,]+),\s*([^)]+)\)/g,
    (_, a, b) => `${a} \\bmod ${b}`
  );

  // 12. Optional: spacing cleanup (e.g., add spaces around +, -, =)
  formatted = formatted.replace(/([^\s\\])([+\-=])/g, "$1 $2");
  formatted = formatted.replace(/([+\-=])([^\s\\])/g, "$1 $2");

  return formatted;
}
