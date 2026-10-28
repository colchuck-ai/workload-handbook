module.exports = {
  plugins: [
    "remark-validate-links",
    [
      "remark-lint-no-dead-urls",
      {
        skipUrlPatterns: [
          // Skip HashiCorp URLs due to rate limiting
          "https://developer.hashicorp.com",
          // Skip gitlab.com URLs - unauthenticated automated requests are
          // rate limited (HTTP 429), so every link reads as dead
          "https://gitlab.com",
          // Skip placeholder hosts (example.com) - they do not resolve
          /^https?:\/\/([a-z0-9-]+\.)*example\.com/,
        ],
      },
    ],
  ],
};
