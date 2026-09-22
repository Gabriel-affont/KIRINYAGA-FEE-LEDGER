import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kirinyaga Fee Ledger",
  description:
    "Work out your exact household fee under the HEF band system, and what's due now while government disbursement is delayed.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@400;500;600&family=Source+Serif+4:opsz,wght@8..60,500;8..60,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-ledger-paper text-ledger-ink font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
