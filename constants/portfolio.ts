import portfolioJson from "./portfolio.json";

/**
 * Portfolio data loaded from JSON with non-serializable values added
 *
 * SINGLE SOURCE OF TRUTH: Edit portfolio.json to update all content
 * This file only adds things that can't be in JSON (functions, images)
 */
export const portfolioData = {
  ...portfolioJson,
  // Override with non-serializable values that can't be in JSON
  personal: {
    ...portfolioJson.personal,
    profileImage: require("../assets/shahmdmahi.png"),
  },
  footer: {
    ...portfolioJson.footer,
    // Add copyright function that can't be serialized in JSON
    copyright: (year: number) =>
      `© ${year} ${portfolioJson.footer.copyrightText}`,
  },
};

export type PortfolioData = typeof portfolioData;
