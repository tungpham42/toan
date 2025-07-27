import type { Metadata } from "next";
import { getHostUrl } from "@/utils/getHostUrl";
import NumberConverter from "@/pages/NumberConverter";

export async function generateMetadata(): Promise<Metadata> {
  const hostUrl = await getHostUrl();
  return {
    title: "Math Tools - Number Base Converter",
    description: "A full-featured mathematics tool",
    openGraph: {
      title: "Math Tools - Number Base Converter",
      description: "A full-featured mathematics tool",
      url: `${hostUrl}/tools/number-converter`,
      siteName: "Math Tools",
      images: [
        {
          url: `${hostUrl}/1200x630_number.jpg`,
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
      title: "Math Tools - Number Base Converter",
      description: "A full-featured mathematics tool",
    },
  };
}

export default function NumberConverterPage() {
  return <NumberConverter />;
}
