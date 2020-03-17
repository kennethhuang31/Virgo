export class ServicePriceInfo {
  normalDay: number | undefined;
  emergencyDay: number | undefined;
  beforeImageUrl: string | undefined;
  afterImageUrl: string | undefined;
  normalPrice: number | undefined;
  emergencyPrice: number | undefined;
  serviceLabel: any | undefined;
  id: number | undefined;
}

export class ServiceLevelBrief {
  id: number | undefined;
  name: string | undefined;
  chinese: string | undefined;
  order: number | undefined;
  imageUrl: string | undefined;
  labelLevel: number | undefined;
  parentLabelId: number | undefined;
  servicePriceInfoId: number | undefined;
  servicePriceInfo: ServicePriceInfo | undefined;
  childrenLabel: [] | undefined;
  itemServices: [] | undefined;
  ParentLabel: any | undefined;
}

export class ServiceLevelPostBrief {
  Name: string | undefined;
  Chinese: string | undefined;
  Order: number | undefined;
  ImageUrl: string | undefined;
  LabelLevel: number | undefined;
  ParentLabelId: number | undefined;
}

export class ServiceLevelPutBrief {
  Name: string | undefined;
  Chinese?: string | undefined;
  Order?: number | undefined;
  ImageUrl?: string | undefined;
  ServicePriceInfoDto?: {
    NormalDay?: number | undefined;
    EmergencyDay?: number | undefined;
    BeforeImageUrl?: string | undefined;
    AfterImageUrl?: string | undefined;
    NormalPrice?: number | undefined;
    EmergencyPrice?: number | undefined;
  };
}
