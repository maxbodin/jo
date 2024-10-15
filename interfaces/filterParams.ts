export type FilterParams = {
  year?: string;
  season?: string;
  country_code?: string;
  name?: string;
  gender?: string;
  noc?: string;
  hostCity?: string;
  sports?: string | string[];
  medals?: string  | string[];
  groupByCountry?: string | boolean;
  sortOrder?: string
}