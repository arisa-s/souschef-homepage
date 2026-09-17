const { LOCALE_OPTIONS, DEFAULT_LOCALE } = require("./constants");

const i18nConfig = {
    locales: LOCALE_OPTIONS,
    defaultLocale: DEFAULT_LOCALE,
    prefixDefault: false,
  };

module.exports = i18nConfig;