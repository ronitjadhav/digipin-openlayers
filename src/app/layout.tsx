import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google"; // Import Space_Grotesk
import "./globals.css";
import {ThemeProvider} from "@/components/theme-provider";
import {FloatingNavDemo} from "@/components/navbar";
import 'react-toastify/dist/ReactToastify.css';
import "@fontsource/space-grotesk/400.css"; // Regular
import "@fontsource/space-grotesk/500.css"; // Medium
import "@fontsource/space-grotesk/700.css"; // Bold

const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"], 
  variable: "--font-space-grotesk" // Add variable name
});

export const metadata: Metadata = {
  title: {
    default: "DIGIPIN - Digital Postal Index Number | Geocoded Addressing System",
    template: "%s | DIGIPIN"
  },
  description: "Get your DIGIPIN - Digital Postal Index Number for any location in India. Interactive map-based tool to generate precise 10-digit alphanumeric geocodes for accurate addressing and delivery.",
  keywords: [
    "DIGIPIN",
    "Digital Postal Index Number", 
    "India Post",
    "geocoding",
    "addressing system",
    "postal code",
    "location finder",
    "latitude longitude",
    "IIT Hyderabad",
    "Department of Posts",
    "geospatial",
    "delivery",
    "GPS coordinates"
  ],
  authors: [{ name: "DIGIPIN Team" }],
  creator: "India Post & IIT Hyderabad",
  publisher: "DIGIPIN",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://ronitjadhav.github.io'),
  alternates: {
    canonical: '/digipin-openlayers',
  },
  openGraph: {
    title: "DIGIPIN - Digital Postal Index Number Generator",
    description: "Interactive map tool to generate DIGIPIN codes for any location in India. Get precise 10-digit alphanumeric geocodes for accurate addressing.",
    url: 'https://ronitjadhav.github.io/digipin-openlayers',
    siteName: 'DIGIPIN',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/digipin-openlayers/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DIGIPIN - Digital Postal Index Number Generator',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DIGIPIN - Digital Postal Index Number Generator',
    description: 'Get precise DIGIPIN codes for any location in India with our interactive map tool.',
    images: ['/digipin-openlayers/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'TZD0HP_LuYvc72m2yLnTS2lXSG2k3SVDp6fBo0V0otI',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "DIGIPIN - Digital Postal Index Number Generator",
    "description": "Interactive map-based tool to generate DIGIPIN codes for precise addressing in India",
    "url": "https://ronitjadhav.github.io/digipin-openlayers",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    },
    "creator": {
      "@type": "Organization",
      "name": "India Post & IIT Hyderabad",
      "url": "https://www.indiapost.gov.in"
    },
    "audience": {
      "@type": "Audience",
      "audienceType": "General Public",
      "geographicArea": {
        "@type": "Country",
        "name": "India"
      }
    },
    "featureList": [
      "Generate DIGIPIN codes",
      "Interactive map interface", 
      "Latitude/Longitude conversion",
      "Precise 4m x 4m grid addressing",
      "Dark/Light theme support"
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${inter.className} ${spaceGrotesk.variable}`} suppressHydrationWarning><ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
      >
          <FloatingNavDemo />
        {children}
      </ThemeProvider></body>
    </html>
  );
}
