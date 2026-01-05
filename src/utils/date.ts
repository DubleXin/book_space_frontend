export const toMonDD = (
  data: string,
  timezone?: string
): { numeric: string; formatted: string } => {
  return {
    numeric: new Intl.DateTimeFormat("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "2-digit",
      timeZone: timezone,
    }).format(new Date(data)),
    formatted: new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
      timeZone: timezone,
    }).format(new Date(data)),
  };
};
