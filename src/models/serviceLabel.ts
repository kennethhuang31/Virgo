import { MultiLanguageContent } from "./general";

export class BaseServiceLabel {
  id: number;
  name: string;
  parentLabelId?: number;
}

export class RootServiceLabel extends BaseServiceLabel {}

export class LevelTwoServiceLabel extends BaseServiceLabel {
  parentLabel?: RootServiceLabel;
}

export class LevelThreeServiceLabel extends BaseServiceLabel {
  imageUrl: string;
  notUrgentDays: number;
  urgentDays: number;
  discount: number;
  parentLabel?: LevelTwoServiceLabel;
}

export class LevelFourServiceLabel extends BaseServiceLabel {
  parentLabel?: LevelThreeServiceLabel;
}

export class LevelFiveServiceLabel extends BaseServiceLabel {
  parentLabel?: LevelFourServiceLabel;
}

export class LevelSixServiceLabel {
  id: number;
  beforeImageUrl: string;
  afterImageUrl: string;
  content: MultiLanguageContent;
  notUrgentDays: number;
  urgentDays: number;
  notUrgentCost: number;
  urgentCost: number;
  parentLabelId: number;
  parentLabel?: LevelFiveServiceLabel;
}

export class LevelSevenServiceLabel {
  id: number;
  minValue: number;
  maxValue?: number;
  cost: number;
  parentLabelId: number;
}
