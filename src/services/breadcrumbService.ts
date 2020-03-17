import { Breadcrumb, BreadcrumbBrief } from "models";
import { store, updateBreadcrumbs, BreadcrumbsAction } from "app-redux";

class BreadcrumbService {
  flattenBreadcrumb(breadcrumbs: Breadcrumb): BreadcrumbBrief[] {
    return this.populateChildBreadcrumb(breadcrumbs, []);
  }

  navigateToNextLabel(label: string, url: string) {
    const state: Breadcrumb = store.getState().breadcrumbReducer.breadcrumb;
    const newBreadcrumb = new Breadcrumb(label, url);
    const newState = this.setLatestBreadcrumb(state, newBreadcrumb);
    store.dispatch(updateBreadcrumbs(newState));
  }

  private setLatestBreadcrumb(
    state: Breadcrumb,
    newBreadcrumb: Breadcrumb
  ): Breadcrumb {
    let isLatest = false;
    let temp: Breadcrumb = state;
    while (!isLatest) {
      if (temp.next === undefined) {
        isLatest = true;
        temp.next = newBreadcrumb;
      }
      else{
        temp = temp.next;
      }
    }
    return state;
  }

  private populateChildBreadcrumb(
    breadcrumb: Breadcrumb,
    result: BreadcrumbBrief[]
  ) {
    result.push({
      label: breadcrumb.label,
      url: breadcrumb.url
    });

    if (breadcrumb.next !== undefined) {
      this.populateChildBreadcrumb(breadcrumb.next, result);
    }
    return result;
  }
}

export const breadcrumbService = new BreadcrumbService();
