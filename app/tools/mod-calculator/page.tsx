import type { Metadata } from "next";
import { getHostUrl } from "@/utils/getHostUrl";
import ModCalculator from "@/pages/ModCalculator";

export async function generateMetadata(): Promise<Metadata> {
  const hostUrl = await getHostUrl();
  return {
    title: "Math Tools - Mod Calculator",
    description: "A full-featured mathematics tool",
    openGraph: {
      title: "Math Tools - Mod Calculator",
      description: "A full-featured mathematics tool",
      url: `${hostUrl}/tools/mod-calculator`,
      siteName: "Math Tools",
      images: [
        {
          url: `${hostUrl}/1200x630_mod.jpg`,
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
      title: "Math Tools - Mod Calculator",
      description: "A full-featured mathematics tool",
    },
  };
}

export default function ModCalculatorPage() {
  return <ModCalculator />;
}
