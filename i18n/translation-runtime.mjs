import { localeDirection } from './locale-contract.mjs';

function readPath(value, path) {
  return path.split('.').reduce((current, part) => current?.[part], value);
}

function interpolate(value, params) {
  return String(value).replace(/{{\s*([\w.-]+)\s*}}/g, (_, name) => {
    return params?.[name] === undefined ? `{{${name}}}` : String(params[name]);
  });
}

export function createTranslator(resources, locale, fallbackLocale = 'en') {
  return (key, params = {}) => {
    const value = readPath(resources[locale], key) ?? readPath(resources[fallbackLocale], key);
    return value === undefined ? key : interpolate(value, params);
  };
}

export function applyDocumentLocale(root, locale) {
  root.documentElement.lang = locale;
  root.documentElement.dir = localeDirection(locale);
}
