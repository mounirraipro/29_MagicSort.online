import type { Metadata } from "next";
import Script from 'next/script';
import { Bricolage_Grotesque, Nunito, Sriracha } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { SITE_NAME, SITE_URL, TOTAL_LEVELS } from './lib/siteData';

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const sriracha = Sriracha({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-sriracha",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Magic Sort - Free Online Bottle Sorting Puzzle",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    `Play ${SITE_NAME} online and organize colorful liquids into matching bottles across ${TOTAL_LEVELS} browser puzzle levels.`,
  keywords: [
    SITE_NAME,
    "magic sort game",
    "liquid sorting puzzle",
    "bottle sorting game",
    "online puzzle game",
    "free browser game",
    "color sort puzzle",
    "sorting game",
    "logic puzzle",
  ],
  authors: [{ name: `${SITE_NAME} Editorial Team` }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    title: "Magic Sort - Free Online Bottle Sorting Puzzle",
    description:
      `Sort layered liquids into matching bottles across ${TOTAL_LEVELS} browser levels in ${SITE_NAME}.`,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Magic Sort - Free Online Bottle Sorting Puzzle",
    description:
      `A calm browser puzzle where you separate colorful liquids, free up empty bottles, and finish clean stacks.`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

function getPublisherId() {
  const raw = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;
  if (!raw) return '';
  return raw.startsWith('ca-pub-') ? raw : `ca-pub-${raw}`;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const publisherId = getPublisherId();

  return (
    <html lang="en">
      <head>
        {publisherId ? (
          <Script
            id="adsense-script"
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        ) : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: SITE_NAME,
              url: SITE_URL,
              description:
                `Free online liquid sorting puzzle with ${TOTAL_LEVELS} browser levels.`,
            }),
          }}
        />
      </head>
      <body className={`${nunito.variable} ${bricolage.variable} ${sriracha.variable}`}>
        <Header />
        <main className="site-main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
