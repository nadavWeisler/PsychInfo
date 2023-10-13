const { i18n } = require("./next-i18next.config");
/** @type {import('next').NextConfig} */
const nextConfig = {};
module.exports = {
    i18n: {
        locales: ["he", "en", "arb", "rus"],
        defaultLocale: "he",
    },
    async rewrites() {
        return [
            {
                source: "/he/",
                destination: "/",
                locale: false,
            },
        ];
    },
};

module.exports = nextConfig;
