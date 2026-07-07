export type CountryKey =
  | "tajikistan"
  | "kazakhstan"
  | "saudi"
  | "uae"
  | "qatar"
  | "iraq"
  | "kuwait"
  | "russia";

export const countryKeys: CountryKey[] = [
  "tajikistan",
  "kazakhstan",
  "saudi",
  "uae",
  "qatar",
  "iraq",
  "kuwait",
  "russia",
];

export const countries: Record<
  CountryKey,
  { lng: number; lat: number; iso: number }
> = {
  tajikistan: { lng: 68.78, lat: 38.56, iso: 762 },
  kazakhstan: { lng: 71.43, lat: 51.13, iso: 398 },
  saudi: { lng: 45.08, lat: 23.89, iso: 682 },
  uae: { lng: 55.27, lat: 25.2, iso: 784 },
  qatar: { lng: 51.53, lat: 25.29, iso: 634 },
  iraq: { lng: 44.37, lat: 33.31, iso: 368 },
  kuwait: { lng: 47.98, lat: 29.38, iso: 414 },
  russia: { lng: 37.62, lat: 55.75, iso: 643 },
};
