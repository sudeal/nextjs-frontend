"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import i18nConfig from "@/i18n";

const workflowItems = [
  {
    key: "workflow-application",
    titleKey: "header.workflow.items.application.title",
    descriptionKey: "header.workflow.items.application.description",
  },
  {
    key: "workflow-statement",
    titleKey: "header.workflow.items.statement.title",
    descriptionKey: "header.workflow.items.statement.description",
  },
  {
    key: "workflow-tempExport",
    titleKey: "header.workflow.items.tempExport.title",
    descriptionKey: "header.workflow.items.tempExport.description",
  },
  {
    key: "workflow-loadingList",
    titleKey: "header.workflow.items.loadingList.title",
    descriptionKey: "header.workflow.items.loadingList.description",
  },
  {
    key: "workflow-compliance",
    titleKey: "header.workflow.items.compliance.title",
    descriptionKey: "header.workflow.items.compliance.description",
  },
  {
    key: "workflow-payment",
    titleKey: "header.workflow.items.payment.title",
    descriptionKey: "header.workflow.items.payment.description",
  },
  {
    key: "workflow-preNotice",
    titleKey: "header.workflow.items.preNotice.title",
    descriptionKey: "header.workflow.items.preNotice.description",
  },
  {
    key: "workflow-transit",
    titleKey: "header.workflow.items.transit.title",
    descriptionKey: "header.workflow.items.transit.description",
  },
  {
    key: "workflow-sbOperations",
    titleKey: "header.workflow.items.sbOperations.title",
    descriptionKey: "header.workflow.items.sbOperations.description",
  },
  {
    key: "workflow-insurance",
    titleKey: "header.workflow.items.insurance.title",
    descriptionKey: "header.workflow.items.insurance.description",
  },
  {
    key: "workflow-invoice",
    titleKey: "header.workflow.items.invoice.title",
    descriptionKey: "header.workflow.items.invoice.description",
  },
];

const pricingItems = [
  { key: "pricing-transport", titleKey: "header.pricing.items.transport.title", descriptionKey: "header.pricing.items.transport.description" },
  { key: "pricing-risk", titleKey: "header.pricing.items.risk.title", descriptionKey: "header.pricing.items.risk.description" },
  { key: "pricing-stock", titleKey: "header.pricing.items.stock.title", descriptionKey: "header.pricing.items.stock.description" },
  { key: "pricing-payment", titleKey: "header.pricing.items.payment.title", descriptionKey: "header.pricing.items.payment.description" },
];

const simpleNavItems: Array<{ labelKey: string; href?: string; dispatchKey?: string }> = [
  { labelKey: "header.nav.track", dispatchKey: "track" },
  { labelKey: "header.nav.about", dispatchKey: "about" },
  { labelKey: "header.nav.declaration", href: "/beyan" },
  { labelKey: "header.nav.product", href: "/product" },
  { labelKey: "header.nav.product2", href: "/product2" },
];

const ArrowIcon = () => (
  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
    <path d="M1 2l5 4 5-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BellIcon = () => (
  <svg width="18" height="20" viewBox="0 0 18 20" fill="none" aria-hidden="true">
    <path
      d="M9 19c1.1 0 2-.9 2-2H7c0 1.1.9 2 2 2Zm6-5V9c0-3.07-1.63-5.64-4.5-6.32V2a1.5 1.5 0 1 0-3 0v.68C4.63 3.36 3 5.92 3 9v5l-2 2v1h16v-1l-2-2Z"
      fill="currentColor"
    />
  </svg>
);

const UserIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
    <path d="M5 20c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

type HeaderProps = {
  locale: string;
  dictionary: Record<string, unknown>;
};

const getFromDictionary = (dictionary: Record<string, unknown>, path: string) => {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, dictionary);
};

export function Header({ locale, dictionary }: HeaderProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const pathname = usePathname();
  const router = useRouter();
  const t = useMemo(() => {
    return (key: string) => (getFromDictionary(dictionary, key) as string) ?? key;
  }, [dictionary]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const insideDropdown = Object.values(dropdownRefs.current).some(
        (ref) => ref && ref.contains(target)
      );
      const insideButton = Object.values(buttonRefs.current).some(
        (ref) => ref && ref.contains(target)
      );

      if (!insideDropdown && !insideButton) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = (menu: string) => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  };

  const dispatchSelection = (type: string, key: string) => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent("header:select", { detail: { type, key } }));
    setOpenMenu(null);
  };

  const buildLocalizedHref = (href = "/") => {
    const normalized = href.startsWith("/") ? href : `/${href}`;
    return `/${locale}${normalized === "/" ? "" : normalized}`;
  };

  const handleLocaleChange = (nextLocale: string) => {
    if (!pathname || nextLocale === locale) return;
    const segments = pathname.split("/").filter(Boolean);
    segments[0] = nextLocale;
    router.push(`/${segments.join("/")}`);
  };

  const getNavLinkClass = (href?: string) => {
    const baseClass =
      "flex items-center gap-1 rounded-full border px-3 py-1.5 text-sm font-semibold transition sm:px-4 sm:text-base";
    const inactiveClass = "border-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900";
    const activeClass = "border-sky-100 bg-sky-50 text-sky-700";
    if (!href) {
      return `${baseClass} ${inactiveClass}`;
    }
    const isActive = pathname === href || pathname.startsWith(`${href}/`);
    return `${baseClass} ${isActive ? activeClass : inactiveClass}`;
  };

  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="flex w-full items-center justify-between gap-4 px-4 py-3 sm:gap-6 sm:px-6 sm:py-4 lg:px-10">
        <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
          <Link
            href={buildLocalizedHref()}
            onClick={() => dispatchSelection("reset", "home")}
            className="flex items-center gap-2 text-xl font-semibold text-sky-700 sm:text-2xl"
          >
            <span className="rounded-full bg-sky-600 px-2 py-1 text-sm text-white sm:px-3">
              {t("header.brand")}
            </span>
          </Link>
          <nav className="hidden items-center gap-2 text-sm font-medium text-slate-600 lg:flex lg:gap-4">
            <div className="relative group">
              <button
                type="button"
                ref={(node) => {
                  buttonRefs.current.workflows = node;
                }}
                onClick={() => toggleMenu("workflows")}
                className="flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 sm:px-4 sm:text-base"
              >
                {t("header.workflow.label")}
                <ArrowIcon />
              </button>
              <div
                ref={(node) => {
                  dropdownRefs.current.workflows = node;
                }}
                className={`absolute left-0 top-[calc(100%+12px)] z-20 w-[280px] rounded-3xl border border-zinc-100 bg-white p-4 text-sm text-slate-600 shadow-2xl transition duration-200 sm:w-[400px] sm:p-6 lg:w-[560px] ${
                  openMenu === "workflows"
                    ? "visible scale-100 opacity-100"
                    : "invisible scale-95 opacity-0 group-hover:visible group-hover:scale-100 group-hover:opacity-100"
                }`}
              >
                <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-4">
                  {workflowItems.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => dispatchSelection("workflow", item.key)}
                      className="space-y-1 text-left transition hover:text-sky-600"
                    >
                      <p className="text-sm font-semibold text-slate-800">{t(item.titleKey)}</p>
                      <p className="text-xs text-slate-500">{t(item.descriptionKey)}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative group">
              <button
                type="button"
                ref={(node) => {
                  buttonRefs.current.pricing = node;
                }}
                onClick={() => toggleMenu("pricing")}
                className="flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 sm:px-4 sm:text-base"
              >
                {t("header.pricing.label")}
                <ArrowIcon />
              </button>
              <div
                ref={(node) => {
                  dropdownRefs.current.pricing = node;
                }}
                className={`absolute left-0 top-[calc(100%+12px)] z-20 w-[280px] rounded-3xl border border-zinc-100 bg-white p-4 text-sm text-slate-600 shadow-2xl transition duration-200 sm:w-[320px] sm:p-6 lg:w-[360px] ${
                  openMenu === "pricing"
                    ? "visible scale-100 opacity-100"
                    : "invisible scale-95 opacity-0 group-hover:visible group-hover:scale-100 group-hover:opacity-100"
                }`}
              >
                <div className="grid gap-y-4">
                  {pricingItems.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => dispatchSelection("pricing", item.key)}
                      className="space-y-1 text-left transition hover:text-sky-600"
                    >
                      <p className="text-sm font-semibold text-slate-800">{t(item.titleKey)}</p>
                      <p className="text-xs text-slate-500">{t(item.descriptionKey)}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {simpleNavItems.map((item) => {
              if (item.href) {
                return (
                  <Link key={item.labelKey} href={buildLocalizedHref(item.href)} className={getNavLinkClass(item.href)}>
                    {t(item.labelKey)}
                  </Link>
                );
              }
              return (
                <button
                  type="button"
                  key={item.labelKey}
                  onClick={() => dispatchSelection("nav", item.dispatchKey ?? item.labelKey)}
                  className="flex items-center gap-1 rounded-full px-4 py-1.5 text-base text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                >
                  {t(item.labelKey)}
                  <ArrowIcon />
                </button>
              );
            })}
            <Link href={buildLocalizedHref("/profile")} className={getNavLinkClass("/profile")}>
              {t("header.nav.profile")}
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-slate-500 transition hover:border-slate-300 hover:text-slate-700 sm:h-11 sm:w-11"
            aria-label={t("header.notifications")}
          >
            <BellIcon />
          </button>
          <label className="sr-only" htmlFor="language-select">
            {t("header.language.label")}
          </label>
          <select
            id="language-select"
            value={locale}
            onChange={(event) => handleLocaleChange(event.target.value)}
            className="h-9 rounded-full border border-zinc-200 bg-white px-3 text-sm font-medium text-slate-600 shadow-sm transition focus:border-sky-400 focus:outline-none sm:h-11"
            aria-label={t("header.language.label")}
          >
            {i18nConfig.locales.map((code) => (
              <option key={code} value={code}>
                {t(`header.language.options.${code}`)}
              </option>
            ))}
          </select>
          <div className="hidden items-center gap-2 rounded-full border border-zinc-200 bg-white px-2 py-1.5 shadow-sm sm:flex sm:gap-3 sm:px-4 sm:py-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 sm:h-11 sm:w-11">
              <UserIcon />
            </div>
            <div className="hidden text-left lg:block">
              <p className="text-sm font-semibold text-slate-800">{t("header.user.name")}</p>
              <p className="text-xs text-slate-500">{t("header.user.company")}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

