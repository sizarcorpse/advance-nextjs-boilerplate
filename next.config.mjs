import withBundleAnalyzer from "@next/bundle-analyzer";
import createJiti from "jiti";
import withNextIntl from "next-intl/plugin";
import { fileURLToPath } from "node:url";

const jiti = createJiti(fileURLToPath(import.meta.url));
jiti("./src/libs/env");

const withNextIntlConfig = withNextIntl("./src/libs/i18n.ts");

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */

export default bundleAnalyzer(
  withNextIntlConfig({
    eslint: {
      dirs: ["."],
    },
    poweredByHeader: false,
    reactStrictMode: true,
  })
);
