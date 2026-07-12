export const staleTimeValues = {
  ZERO: 0,
  FIVE_SECONDS: 5_000,
  TEN_SECONDS: 10_000,
  THIRTY_SECONDS: 30_000,
  ONE_MINUTE: 60_000,
  TWO_MINUTES: 120_000,
  FIVE_MINUTES: 300_000,
  TEN_MINUTES: 600_000,
  INFINITE: Infinity,
} as const;

export const reactQueryConfig = { defaultOptions: { queries: { throwOnError: true } } };
