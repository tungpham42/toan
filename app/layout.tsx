import "./globals.css";
import Header from "@/components/Header";
import BackToTopButton from "@/components/BackToTopButton";
import type { Metadata } from "next";
import { getHostUrl } from "@/utils/getHostUrl";

export async function generateMetadata(): Promise<Metadata> {
  const hostUrl = await getHostUrl();
  return {
    title: "Math Tools",
    description: "A full-featured mathematics tool",
    openGraph: {
      title: "Math Tools",
      description: "A full-featured mathematics tool",
      url: hostUrl,
      siteName: "Math Tools",
      images: [
        {
          url: `${hostUrl}/1200x630.jpg`,
          width: 1200,
          height: 630,
          alt: "Math Tools Open Graph Image",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Math Tools",
      description: "A full-featured mathematics tool",
    },
  };
}

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
          <p className="text-sm">© 2025 Math Tools. All rights reserved.</p>
        </footer>
        <BackToTopButton />
      </body>
    </html>
  );
}
