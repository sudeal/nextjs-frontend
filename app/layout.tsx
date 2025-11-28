import type { Metadata } from "next";
import { headers, cookies } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "antd/dist/reset.css";
import "./globals.css";
import i18nConfig from "@/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const loadDictionary = async (locale: string) => {
  try {
    const module = await import(`@/locales/${locale}/common.json`);
    return module.default;
  } catch (error) {
    console.warn(`[i18n] common.json missing for locale "${locale}", falling back to tr.`);
    const fallback = await import("@/locales/tr/common.json");
    return fallback.default;
  }
};

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
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || headersList.get("x-locale") || i18nConfig.defaultLocale;
  const commonDictionary = await loadDictionary(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} bg-zinc-100 antialiased`}>
        <div className="flex min-h-screen flex-col bg-zinc-100">
          <Header locale={locale} dictionary={commonDictionary} />
          <main className="flex-1">{children}</main>
          <Footer locale={locale} />
        </div>
      </body>
    </html>
  );
}
