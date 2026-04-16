import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VillaOS - Your Villas. On Autopilot.",
  description: "Villa Management Operating System for Phuket, Thailand. Manage reservations, tasks, staff, and owner reporting from one dashboard.",
  keywords: [
    "villa management",
    "Phuket",
    "property management",
    "villa rental",
    "task management",
    "owner reporting",
    "Thailand",
    "vacation rental",
    "Airbnb management",
    "Booking.com",
  ],
  authors: [{ name: "VillaOS" }],
  creator: "VillaOS",
  metadataBase: new URL("https://villaos.co"),
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon.svg" }],
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://villaos.co",
    siteName: "VillaOS",
    title: "VillaOS - The Operating System for Phuket Villa Managers",
    description:
      "Manage 50+ villas from one dashboard. Automate tasks, track revenue, delight owners. Built for Phuket villa managers.",
  },
  twitter: {
    card: "summary_large_image",
    title: "VillaOS - The Operating System for Phuket Villa Managers",
    description:
      "Manage 50+ villas from one dashboard. Automate tasks, track revenue, delight owners.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
