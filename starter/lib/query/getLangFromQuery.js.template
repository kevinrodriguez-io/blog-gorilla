export default function getLangFromQuery({ query }) {
  const { lang } = query;
  const currentLanguage = !lang ? 'en' : lang;
  const locale = currentLanguage === 'en' ? 'en-US' : 'es-CR';
  return { lang: currentLanguage, locale };
}
