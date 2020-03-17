export class BaseLocation {
  id: number;
  name: string;
  chinese?: string;
}

export class Country extends BaseLocation {}

export class City extends BaseLocation {
  countryId: number;
  country?: Country;
}

export class Region extends BaseLocation {
  cityId: number;
  city?: City;
}
