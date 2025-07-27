import type { Metadata } from "next";
import { getHostUrl } from "@/utils/getHostUrl";
import Probability from "@/pages/Probability";

export async function generateMetadata(): Promise<Metadata> {
  const hostUrl = await getHostUrl();
  return {
    title: "Math Tools - Probability",
    description: "A full-featured mathematics tool",
    openGraph: {
      title: "Math Tools - Probability",
      description: "A full-featured mathematics tool",
      url: `${hostUrl}/tools/probability`,
      siteName: "Math Tools",
      images: [
        {
          url: `${hostUrl}/1200x630_probability.jpg`,
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
      title: "Math Tools - Probability",
      description: "A full-featured mathematics tool",
    },
  };
}

export default function ProbabilityPage() {
  return <Probability />;
}
