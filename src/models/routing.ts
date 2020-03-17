export class BasicRoute {
  path?: string;
  exact?: boolean;
  component?: React.LazyExoticComponent<any>;
}

export class SidebarRouter extends BasicRoute {
  icon?: string;
  title: string;
  children?: SidebarRouter[];
}
