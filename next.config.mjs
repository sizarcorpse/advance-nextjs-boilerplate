import MillionLint from "@million/lint";
import withBundleAnalyzer from "@next/bundle-analyzer";
import { withSentryConfig } from "@sentry/nextjs";
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

export default withSentryConfig(
  bundleAnalyzer(
    withNextIntlConfig({
      eslint: {
        dirs: ["."],
      },
      poweredByHeader: false,
      reactStrictMode: true,
      images: {
        remotePatterns: [
          {
            hostname: "img.clerk.com",
          },
          {
            protocol: "https",
            hostname: "utfs.io",
          },
        ],
      },
    })
  ),
  {
    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,
    silent: !process.env.CI,
    widenClientFileUpload: true,
    // tunnelRoute: "/api/monitoring",
    hideSourceMaps: true,
    disableLogger: true,
    automaticVercelMonitors: true,
  }
);

// import MillionLint from "@million/lint";
// import withBundleAnalyzer from "@next/bundle-analyzer";
// import { withSentryConfig } from "@sentry/nextjs";
// import createJiti from "jiti";
// import withNextIntl from "next-intl/plugin";
// import { fileURLToPath } from "node:url";

// const jiti = createJiti(fileURLToPath(import.meta.url));
// jiti("./src/libs/env");

// const withNextIntlConfig = withNextIntl("./src/libs/i18n.ts");

// const bundleAnalyzer = withBundleAnalyzer({
//   enabled: process.env.ANALYZE === "true",
// });

// const nextConfig = {
//   eslint: {
//     dirs: ["."],
//   },
//   poweredByHeader: false,
//   reactStrictMode: true,
//   images: {
//     remotePatterns: [
//       {
//         hostname: "img.clerk.com",
//       },
//     ],
//   },
// };

// const enhancedConfig = withSentryConfig(
//   bundleAnalyzer(withNextIntlConfig(nextConfig)),
//   {
//     org: process.env.SENTRY_ORG,
//     project: process.env.SENTRY_PROJECT,
//     silent: !process.env.CI,
//     widenClientFileUpload: true,
//     // tunnelRoute: "/api/monitoring",
//     hideSourceMaps: true,
//     disableLogger: true,
//     automaticVercelMonitors: true,
//   }
// );

// export default MillionLint.next({ rsc: true })(enhancedConfig);
