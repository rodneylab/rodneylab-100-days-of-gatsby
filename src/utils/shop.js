const formatPrice = (currency, value) => Intl.NumberFormat(undefined, {
  currency,
  minimumFractionDigits: 2,
  style: 'currency',
}).format(value);

export { formatPrice as default };

export const localStorageKey = 'a856f4';
