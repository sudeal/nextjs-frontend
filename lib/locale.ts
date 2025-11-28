"use client";

const LOCALE_COOKIE_NAME = "NEXT_LOCALE";

export function getLocaleFromCookie(): string {
  if (typeof document === "undefined") return "tr";
  const cookies = document.cookie.split(";");
  const localeCookie = cookies.find((cookie) => cookie.trim().startsWith(`${LOCALE_COOKIE_NAME}=`));
  return localeCookie ? localeCookie.split("=")[1] : "tr";
}

export function setLocaleCookie(locale: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${LOCALE_COOKIE_NAME}=${locale}; path=/; max-age=31536000; SameSite=Lax`;
}

