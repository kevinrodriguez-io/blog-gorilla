import { VALID_LANGS } from '../../lib/translations/validLangs';

export default async function handle(req, res) {
  const { lang, namespace } = req.query;
  if (!lang || !namespace)
    return res.status(400).json({ message: 'LANG_AND_NAMESPACE_REQUIRED' });
  if (VALID_LANGS.indexOf(lang) === -1)
    return res.status(404).json({ message: 'LANG_NOT_FOUND' });
  const langs = await import(
    `../../lib/translations/${lang}/${namespace}.json`
  );
  return res.status(200).json(langs.default);
}
