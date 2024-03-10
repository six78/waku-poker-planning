export function isUrl(data: string): boolean {
  let url;

  try {
    url = new URL(data);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}