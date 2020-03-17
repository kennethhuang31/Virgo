import { SortType, SortDirection } from "./enum";

export class MultiLanguageContent {
  // content in english
  enContent: string;
  // content in chinese
  cnContent: string;
}

export class DropdownItem {
  id: number;
  name: string;
  value?: string;
  constructor(id: number, name: string, value?: string) {
    this.id = id;
    this.name = name;
    this.value = value ?? name;
  }
}

export class TableHeader {
  displayName: string;
  displayCount: boolean;
  countNumber?: number;
  sort: boolean;
}

export class Breadcrumb {
  label: string;
  url: string;
  next?: Breadcrumb;
  constructor(label: string, url: string, next?: Breadcrumb) {
    this.label = label;
    this.url = url;
    this.next = next;
  }
}

export class BreadcrumbBrief {
  label: string;
  url: string;
}
