import type { Metadata } from "next";
import { getHostUrl } from "@/utils/getHostUrl";
import Matrix from "@/pages/Matrix";

export async function generateMetadata(): Promise<Metadata> {
  const hostUrl = await getHostUrl();
  return {
    title: "Math Tools - Matrix",
    description: "A full-featured mathematics tool",
    openGraph: {
      title: "Math Tools - Matrix",
      description: "A full-featured mathematics tool",
      url: `${hostUrl}/tools/matrix`,
      siteName: "Math Tools",
      images: [
        {
          url: `${hostUrl}/1200x630_matrix.jpg`,
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
      title: "Math Tools - Matrix",
      description: "A full-featured mathematics tool",
    },
  };
}

export default function MatrixPage() {
  return <Matrix />;
}
