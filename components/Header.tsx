"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import MainBrandLogo from "./MainBrandLogo";

const tools = [
  { label: "Factorizer", href: "/tools/factorizer" },
  { label: "Graph", href: "/tools/graph" },
  { label: "Matrix", href: "/tools/matrix" },
  { label: "Differentiator", href: "/tools/differentiator" },
  { label: "Integrator", href: "/tools/integrator" },
  { label: "Mod Calculator", href: "/tools/mod-calculator" },
  { label: "Number Converter", href: "/tools/number-converter" },
  { label: "Prime Checker", href: "/tools/prime-checker" },
  { label: "Probability", href: "/tools/probability" },
  { label: "Quadratic Solver", href: "/tools/quadratic-solver" },
  { label: "Statistics", href: "/tools/statistics" },
  { label: "Permutation", href: "/tools/permutation" },
  { label: "Arrangement", href: "/tools/arrangement" },
  { label: "Combination", href: "/tools/combination" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="bg-white shadow-xl sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link
            href="/"
            className="text-2xl font-extrabold text-gray-900 tracking-tight"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
              Math Tools
            </span>
          </Link>

          {/* Nav for larger screens */}
          <nav className="hidden lg:flex lg:space-x-6">
            <Link
              href="/"
              className={`text-base font-medium ${
                isActive("/")
                  ? "text-purple-600 font-semibold border-b-2 border-purple-500"
                  : "text-gray-700 hover:text-purple-600 hover:bg-gray-50"
              } transition duration-200 px-4 py-2`}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>

            {/* Dropdown */}
            <div className="relative group">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50 transition duration-200 px-4 py-2"
              >
                Tools
                <ChevronDown className="ml-2 w-5 h-5" />
              </button>
              <div
                className={`${
                  dropdownOpen ? "block" : "hidden lg:group-hover:block"
                } absolute left-0 w-64 bg-white rounded-xl shadow-xl border border-gray-200 z-50 transform hover:scale-[1.02] transition-transform duration-300 max-h-[calc(100vh-100px)] overflow-y-auto`}
              >
                {tools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className={`block px-4 py-2 text-sm ${
                      isActive(tool.href)
                        ? "bg-gray-50 text-purple-600 font-semibold"
                        : "text-gray-700 hover:bg-gray-50 hover:text-purple-600"
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

        <div className="flex items-center space-x-4">
          <MainBrandLogo
            logoSrc="/soft-logo.webp"
            mainDomain="soft.io.vn"
            dismissible={false}
            altText="Logo Soft"
          />
          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-gray-700 hover:text-purple-600 transition duration-200"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <nav
        className={`${
          menuOpen ? "block" : "hidden"
        } lg:hidden absolute top-full left-0 w-full bg-white border-t border-gray-200`}
      >
        <Link
          href="/"
          className={`block px-4 py-3 text-base font-medium ${
            isActive("/")
              ? "text-purple-600 font-semibold border-b-2 border-purple-500"
              : "text-gray-700 hover:text-purple-600 hover:bg-gray-50"
          } transition duration-200`}
          onClick={() => setMenuOpen(false)}
        >
          Home
        </Link>

        {/* Mobile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center w-full px-4 py-3 text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50 transition duration-200"
          >
            Tools
            <ChevronDown className="ml-2 w-5 h-5" />
          </button>
          <div
            className={`${
              dropdownOpen ? "block" : "hidden"
            } w-full bg-white border-t border-gray-200 max-h-[calc(100vh-150px)] overflow-y-auto`}
          >
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className={`block px-4 py-2 text-sm ${
                  isActive(tool.href)
                    ? "bg-gray-50 text-purple-600 font-semibold"
                    : "text-gray-700 hover:bg-gray-50 hover:text-purple-600"
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
    </header>
  );
}
