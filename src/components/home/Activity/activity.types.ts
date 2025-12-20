export type activityBadgeData = {
  source: {
    name: string;
    to?: string;
  };
  timestamp: {
    numeric: string;
    formatted: string;
  };
  action: "updated" | "created" | "starred" | "reviewed";
};
