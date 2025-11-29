export const SERVICES = {
  auth: import.meta.env.VITE_AUTH_SERVICE_ADDRESS!,
  book: import.meta.env.VITE_BOOK_SERVICE_ADDRESS!,
  profile: import.meta.env.VITE_PROFILE_SERVICE_ADDRESS!,
  recommendation: import.meta.env.VITE_RECOMMENDATION_SERVICE_ADDRESS!,
} as const;

export type ServiceName = keyof typeof SERVICES;
