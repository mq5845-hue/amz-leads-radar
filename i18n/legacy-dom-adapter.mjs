export function applyTranslations(root, translate) {
  for (const element of root.querySelectorAll('[data-i18n]')) {
    const key = element.dataset.i18n;
    if (!key) continue;
    const value = translate(key);
    if (value !== undefined) element.textContent = value;

    const attributes = (element.dataset.i18nAttr || '').split(',').map((name) => name.trim()).filter(Boolean);
    for (const attribute of attributes) {
      const attributeValue = translate(`${key}.${attribute}`) ?? value;
      if (attributeValue !== undefined) element.setAttribute(attribute, attributeValue);
    }
  }
}
