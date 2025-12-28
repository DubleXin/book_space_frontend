export function clampText(text: string, limit = 180) {
  if (!text) return "";
  return text.length > limit ? text.slice(0, limit - 1) + "…" : text;
}
