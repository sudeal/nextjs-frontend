import type { ReactNode } from "react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import i18nConfig from "@/i18n";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{
    lang: string;
  }>;
};

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ lang: locale }));
}

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

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const resolvedParams = await params;
  const locale = resolvedParams.lang;
  const commonDictionary = await loadDictionary(locale);

  return (
    <div className="flex min-h-screen flex-col bg-zinc-100">
      <Header locale={locale} dictionary={commonDictionary} />
      <main className="flex-1">{children}</main>
      <Footer locale={locale} />
    </div>
  );
}

