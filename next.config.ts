import type { NextConfig } from "next";
import nextTranslate from "next-translate-plugin";

const nextConfig: NextConfig = {
  turbopack: {},
};

const config = nextTranslate(nextConfig) as NextConfig & { i18n?: unknown };

if ("i18n" in config) {
  delete config.i18n;
}

export default config;
