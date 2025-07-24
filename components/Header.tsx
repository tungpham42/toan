"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const tools = [
  { label: "Factorizer", href: "/tools/factorizer" },
  { label: "Graph", href: "/tools/graph" },
  { label: "Matrix", href: "/tools/matrix" },
  { label: "Differentiator", href: "/tools/differentiator" },
  { label: "Mod Calculator", href: "/tools/mod-calculator" },
  { label: "Number Converter", href: "/tools/number-converter" },
  { label: "Prime Checker", href: "/tools/prime-checker" },
  { label: "Probability", href: "/tools/probability" },
  { label: "Quadratic Solver", href: "/tools/quadratic-solver" },
  { label: "Statistics", href: "/tools/statistics" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-extrabold text-indigo-700 tracking-tight"
        >
          🧮 Math Tools
        </Link>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-indigo-700 hover:text-indigo-500 transition duration-200"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Nav */}
        <nav
          className={`${
            menuOpen ? "block" : "hidden"
          } absolute top-full left-0 w-full bg-white lg:static lg:flex lg:space-x-8 lg:bg-transparent`}
        >
          <Link
            href="/"
            className={`block px-4 py-3 text-base ${
              isActive("/")
                ? "text-indigo-700 font-semibold border-b-2 border-indigo-500"
                : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
            } transition duration-200 lg:border-b-0`}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          {/* Dropdown */}
          <div className="relative group">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center px-4 py-3 text-base text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition duration-200"
            >
              Tools
              <ChevronDown className="ml-2 w-5 h-5" />
            </button>
            <div
              className={`${
                dropdownOpen ? "block" : "hidden lg:group-hover:block"
              } absolute left-0 w-full lg:w-64 bg-white rounded-xl shadow-xl border border-indigo-100 z-50 lg:mt-2`}
            >
              {tools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className={`block px-4 py-2.5 text-sm ${
                    isActive(tool.href)
                      ? "bg-indigo-50 text-indigo-700 font-semibold"
                      : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                  } transition duration-200`}
                  onClick={() => {
                    setDropdownOpen(false);
                    setMenuOpen(false);
                  }}
                >
                  {tool.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
