import { SortDirection } from "models";

class DataHelper {
  sortAlphabet(data: any[], direction: SortDirection, sortKey: string): any[] {
    switch (direction) {
      case SortDirection.Ascending:
        return this.sortAscending(data, sortKey);
      case SortDirection.Descending:
        return this.sortDescending(data, sortKey);
    }
  }

  parseStringToNumber(data: string | number): number {
    if (typeof data === "number") {
      return data;
    }
    const zeroIndex = data.indexOf("0.");
    return zeroIndex === 0 ? parseFloat(data) : parseInt(data);
  }

  private sortAscending(data: any[], sortKey: string): any[] {
    data.sort((a, b) => {
      if (a[sortKey] < b[sortKey]) {
        return -1;
      }
      if (a[sortKey] > b[sortKey]) {
        return 1;
      }
      if (a[sortKey].toUpperCase() < b[sortKey].toUpperCase()) {
        return -1;
      }
      if (a[sortKey].toUpperCase() > b[sortKey].toUpperCase()) {
        return 1;
      }
      return 0;
    });
    return data;
  }

  private sortDescending(data: any[], sortKey: string): any[] {
    data.sort((a, b) => {
      if (a[sortKey] < b[sortKey]) {
        return 1;
      }
      if (a[sortKey] > b[sortKey]) {
        return -1;
      }
      if (a[sortKey].toUpperCase() < b[sortKey].toUpperCase()) {
        return 1;
      }
      if (a[sortKey].toUpperCase() > b[sortKey].toUpperCase()) {
        return -1;
      }
      return 0;
    });
    return data;
  }
}

export const dataHelper = new DataHelper();
