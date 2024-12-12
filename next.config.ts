import type { NextConfig } from "next";
import { DEFAULT_LOCALE, LOCALE_OPTIONS } from "./constants";

const nextConfig: NextConfig = {
  i18n: {
    locales: LOCALE_OPTIONS,
    defaultLocale: DEFAULT_LOCALE,
  },
};

export default nextConfig;
