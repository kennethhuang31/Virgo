import { SidebarRouter, ExpandItemData } from "models";

class RouterHelper {
  createRoutes(routes: SidebarRouter[]): ExpandItemData<SidebarRouter>[] {
    const result: ExpandItemData<SidebarRouter>[] = [];
    routes.forEach(route => {
      let childrenRoutes: ExpandItemData<SidebarRouter>[] = [];
      if (route.children !== undefined && route.children?.length !== 0) {
        childrenRoutes = this.createRoutes(route.children);
      }

      const expandItem: ExpandItemData<SidebarRouter> = {
        item: {
          icon: route.icon,
          path: route.path,
          title: route.title,
          exact: route.exact,
          component: route.component
        },
        children: childrenRoutes
      };
      result.push(expandItem);
    });
    return result;
  }
}

export const routerHelper = new RouterHelper();
