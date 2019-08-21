/**
 * This function takes a NextJS context object and returns
 * a default lang if the lang parameter is not present on the query,
 * otherwise it will return the given lang.
 * It will also return a locale to be used with contentful
 * @param {Object} context - Context object from NextJS
 * @param {Object} context.query - Query object from the given context
 * @param {string} [context.query.lang] - Lang paramter, it can be present or not
 * @typedef LangFromQueryResult
 * @property {string} lang - Lang with default fallback
 * @property {string} locale - Contentful-style locale
 * @returns {LangFromQueryResult}
 */
export default function getLangFromQuery({ query }) {
  const { lang } = query;
  const currentLanguage = !lang ? 'en' : lang;
  const locale = currentLanguage === 'en' ? 'en-US' : 'es-CR';
  return { lang: currentLanguage, locale };
}
