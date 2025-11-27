const locales = ["tr", "en", "az", "ru"];

module.exports = {
  locales,
  defaultLocale: "tr",
  localeDetection: false,
  loadLocaleFrom: (lang, namespace) => import(`./locales/${lang}/${namespace}.json`).then((m) => m.default),
  pages: {
    "*": ["common"],
    "/[lang]": ["home"],
    "/[lang]/beyan": ["beyan"],
    "/[lang]/product": ["product"],
    "/[lang]/product/detail/[id]": ["productDetail"],
    "/[lang]/product2": ["product2"],
    "/[lang]/product2/detail/[id]": ["productDetail"],
    "/[lang]/profile": ["profile"],
  },
};

