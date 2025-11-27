import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "antd/dist/reset.css";
import "./globals.css";
import i18nConfig from "@/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Profil Uygulamasi",
  description: "Profil yonlendirme ve tanitim sayfasi",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const currentLocale = headersList.get("x-locale") ?? i18nConfig.defaultLocale;

  return (
    <html lang={currentLocale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} bg-zinc-100 antialiased`}>
        {children}
      </body>
    </html>
  );
}
