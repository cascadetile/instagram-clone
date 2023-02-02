import { dictionary } from './dictionary';

const settingsLang = 'ru';

export const translate = (phrase: string) => {
  const lowerCase = phrase.toLowerCase().trim();

  const hasTranslate = lowerCase in dictionary;

  if (hasTranslate) {
    const isCapitalize = phrase[0].toUpperCase() === phrase[0];

    let result = dictionary[lowerCase][settingsLang];

    if (isCapitalize) {
      result = result[0].toUpperCase() + result.slice(1);
    }

    return result;
  }

  return phrase;
};
