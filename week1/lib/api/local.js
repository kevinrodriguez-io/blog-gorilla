import fetch from 'isomorphic-unfetch';

async function fetchTranslation(lang, namespace) {
  const fetchUrl = process.browser
    ? `/api/translations?lang=${lang}&namespace=${namespace}`
    : `http://localhost:3000/api/translations?lang=${lang}&namespace=${namespace}`;
  const result = await fetch(fetchUrl);
  return result.json();
}

export default {
  fetchTranslation,
};
