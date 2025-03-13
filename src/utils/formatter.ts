export const getIntlFormat = (...keys: string[]) => keys.join('.');

export const formatDateToOrdinal = (date: Date): string => {
  const month = date.toLocaleString('default', { month: 'long' });
  const day = date.getDate();
  const year = date.getFullYear();

  const suffix =
    day === 1 || day === 21 || day === 31
      ? 'st'
      : day === 2 || day === 22
        ? 'nd'
        : day === 3 || day === 23
          ? 'rd'
          : 'th';

  return `${month} ${day}${suffix}, ${year}`;
};
