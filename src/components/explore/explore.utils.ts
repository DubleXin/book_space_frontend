import type { BooksApiParams, Filters } from "./explore.types";

export function normalizeSubjectName(name: string) {
  return name.trim().toLowerCase().replace(/\s+/g, "_");
}

export function readFilters(sp: URLSearchParams): Filters {
  const search = (sp.get("search") ?? "").trim();
  const author = (sp.get("author") ?? "").trim();
  const subject = sp
    .getAll("subject")
    .map(normalizeSubjectName)
    .filter(Boolean);

  const limitRaw = Number(sp.get("limit") ?? 12);
  const offsetRaw = Number(sp.get("offset") ?? 0);

  const limit = Number.isFinite(limitRaw)
    ? Math.min(Math.max(limitRaw, 6), 30)
    : 12;
  const offset = Number.isFinite(offsetRaw) ? Math.max(offsetRaw, 0) : 0;

  return {
    search,
    author,
    subject: Array.from(new Set(subject)),
    limit,
    offset,
  };
}

export function writeFilters(
  prev: URLSearchParams,
  patch: Partial<ReturnType<typeof readFilters>>
) {
  const sp = new URLSearchParams(prev);

  const setOrDelete = (key: string, value?: string) => {
    const v = (value ?? "").trim();
    if (!v) sp.delete(key);
    else sp.set(key, v);
  };

  if ("search" in patch) setOrDelete("search", patch.search);
  if ("author" in patch) setOrDelete("author", patch.author);

  if ("subject" in patch) {
    sp.delete("subject");
    for (const t of patch.subject ?? []) {
      const subject = normalizeSubjectName(t);
      if (subject) sp.append("subject", subject);
    }
  }

  if ("limit" in patch && patch.limit != null)
    sp.set("limit", String(patch.limit));

  if ("offset" in patch && patch.offset != null)
    sp.set("offset", String(patch.offset));

  if (sp.get("offset") === "0") sp.delete("offset");

  return sp;
}

export function filtersToApiParams(filters: Filters): BooksApiParams {
  const subjects = (filters.subject ?? [])
    .map(normalizeSubjectName)
    .filter(Boolean);

  const subject = Array.from(new Set(subjects)).sort().join(",");

  return {
    search: filters.search.trim(),
    author: filters.author.trim(),
    limit: filters.limit,
    offset: filters.offset,
    ...(subject ? { subject } : {}),
  };
}
