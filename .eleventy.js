const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("styles");
  eleventyConfig.addPassthroughCopy("assets");

  // Date filter
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" })
      .toFormat("LLLL d, yyyy");
  });

  // create a variable for our dev environment; production = gh-pages, nothing = local by default
  const isProduction = process.env.ELEVENTY_ENV === "production";

  // Global variable for our path prefix, remember to insert your repo name
  eleventyConfig.addGlobalData("pathPrefix", isProduction ? "/melisacollecting/" : "/");

  // create a filter for our url prefix 
  eleventyConfig.addFilter("prefixedUrl", (url, prefix) => {
    const finalPrefix = prefix || (isProduction ? "/melisacollecting/" : "/");
    return finalPrefix + url.replace(/^\/+/, "");
  });

	//tells eleventy to output to docs instead of _site
  return {
    dir: { input: ".", output: "docs" },
    htmlTemplateEngine: "njk",
    templateFormats: ["html", "njk", "md"]
  };
};
