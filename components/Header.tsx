"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const workflowItems = [
  { title: "İşlem Başvurusu", description: "Lorem ipsum dolor sit amet consectetur." },
  { title: "İşlem Beyanı", description: "Lorem ipsum dolor sit amet consectetur." },
  { title: "Geçici İhracat Formu", description: "Lorem ipsum dolor sit amet consectetur." },
  { title: "Yükleme Listesi", description: "Lorem ipsum dolor sit amet consectetur." },
  { title: "Ürün Uygunluk Kontrolleri", description: "Lorem ipsum dolor sit amet consectetur." },
  { title: "Ödeme Bildirimi", description: "Lorem ipsum dolor sit amet consectetur." },
  { title: "Gönderi Ön Bildirimi", description: "Lorem ipsum dolor sit amet consectetur." },
  { title: "Geçiş Beyannamesi", description: "Lorem ipsum dolor sit amet consectetur." },
  { title: "SB Operasyon Başvurusu", description: "Lorem ipsum dolor sit amet consectetur." },
  { title: "Lojistik Sigorta Kaydı", description: "Lorem ipsum dolor sit amet consectetur." },
  { title: "İşlem Faturası", description: "Lorem ipsum dolor sit amet consectetur." },
];

const pricingItems = [
  { title: "Taşıma Hizmeti", description: "Lorem ipsum dolor sit amet consectetur." },
  { title: "Risk Yönetimi", description: "Lorem ipsum dolor sit amet consectetur." },
  { title: "Stok Yönetimi", description: "Lorem ipsum dolor sit amet consectetur." },
  { title: "Ödeme Güvencesi", description: "Lorem ipsum dolor sit amet consectetur." },
];

const simpleNavItems: Array<{ label: string; href?: string }> = [
  { label: "Süreç Takibi" },
  { label: "Hakkımızda" },
  { label: "Beyan", href: "/beyan" },
  { label: "Product", href: "/product" },
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

export function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

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

  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="flex w-full items-center justify-between gap-4 px-4 py-3 sm:gap-6 sm:px-6 sm:py-4 lg:px-10">
        <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
          <Link
            href="/"
            onClick={() => dispatchSelection("reset", "home")}
            className="flex items-center gap-2 text-xl font-semibold text-sky-700 sm:text-2xl"
          >
            <span className="rounded-full bg-sky-600 px-2 py-1 text-sm text-white sm:px-3">Marka</span>
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
                İş Akışları
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
                      key={item.title}
                      type="button"
                      onClick={() => dispatchSelection("workflow", item.title)}
                      className="space-y-1 text-left transition hover:text-sky-600"
                    >
                      <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                      <p className="text-xs text-slate-500">{item.description}</p>
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
                Fiyatlandırma
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
                      key={item.title}
                      type="button"
                      onClick={() => dispatchSelection("pricing", item.title)}
                      className="space-y-1 text-left transition hover:text-sky-600"
                    >
                      <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                      <p className="text-xs text-slate-500">{item.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {simpleNavItems.map((item) => {
              if (item.href) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-1 rounded-full px-3 py-1.5 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 sm:px-4 sm:text-base"
                  >
                    {item.label}
                  </Link>
                );
              }
              return (
                <button
                  type="button"
                  key={item.label}
                  onClick={() => dispatchSelection("nav", item.label)}
                  className="flex items-center gap-1 rounded-full px-4 py-1.5 text-base text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                >
                  {item.label}
                  <ArrowIcon />
                </button>
              );
            })}
            <a
              href="http://localhost:3001/profile"
              className="rounded-full border border-sky-100 bg-sky-50 px-3 py-1.5 text-sm font-semibold text-sky-700 transition hover:border-sky-200 hover:bg-sky-100 sm:px-4 sm:text-base"
            >
              Profil
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-slate-500 transition hover:border-slate-300 hover:text-slate-700 sm:h-11 sm:w-11"
          >
            <BellIcon />
          </button>
          <div className="hidden items-center gap-2 rounded-full border border-zinc-200 bg-white px-2 py-1.5 shadow-sm sm:flex sm:gap-3 sm:px-4 sm:py-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 sm:h-11 sm:w-11">
              <UserIcon />
            </div>
            <div className="hidden text-left lg:block">
              <p className="text-sm font-semibold text-slate-800">İsim Soyisim</p>
              <p className="text-xs text-slate-500">Rudiq Limited A.Ş.</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

