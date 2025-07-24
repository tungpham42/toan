import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Math Tool",
  description: "A full-featured mathematics tool",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <footer className="bg-gray-800 text-white text-center py-4">
          <p className="text-sm">© 2025 Math Tool. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
