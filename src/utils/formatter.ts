export const getIntlFormat = (...keys: string[]) => keys.join('.');

export function getCoverImageUrl(
  coverImage:
    | { files: { type: 'file' | 'external'; file?: { url: string }; external?: { url: string } }[] }
    | null
    | undefined,
): string | null {
  const file = coverImage?.files?.[0];
  if (!file) return null;
  return file.type === 'external' ? (file.external?.url ?? null) : (file.file?.url ?? null);
}

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
