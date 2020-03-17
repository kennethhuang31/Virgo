import { lazy } from "react";
import { SidebarRouter } from "models";
import * as PageComponent from "router/page-component";

export const sidebarRoutes: SidebarRouter[] = [
  {
    icon: "house",
    title: "控制板",
    path: "/dashboard",
    component: PageComponent.Dashboard,
    exact: true
  },
  {
    icon: "shopping-kart",
    title: "物品管理",
    path: "/orders",
    component: PageComponent.OrdersHome,
    children: [
      {
        title: "物品搜索",
        path: "/orders/",
        component: PageComponent.OrdersHome,
        exact: true
      },
      {
        title: "详细信息",
        path: "/orders/detail",
        component: PageComponent.OrdersDetail,
        exact: true
      }
    ]
  },
  {
    icon: "client",
    title: "客户管理",
    path: "/customer",
    component: PageComponent.CustomerHome,
    children: [
      {
        title: "客户列表",
        path: "/customer/",
        component: PageComponent.CustomerHome,
        exact: true
      },
      {
        title: "详细信息",
        path: "/customer/detail",
        component: PageComponent.CustomerDetail,
        exact: true
      }
    ]
  },
  {
    // PlEASE set up a DEFAULT route&component if there are some child routes
    icon: "driver",
    title: "骑手管理",
    path: "/courier/detail",
    component: PageComponent.CourierDetail,
    children: [
      {
        title: "员工信息",
        path: "/courier/detail",
        component: PageComponent.CourierDetail,
        exact: false
      },
      {
        title: "创建员工",
        path: "/courier/create",
        component: PageComponent.CourierCreate,
        exact: false
      }
    ]
  },
  {
    // PlEASE set up a DEFAULT route&component if there are some child routes
    icon: "agent",
    title: "代理管理",
    path: "/agent",
    component: PageComponent.AgentHome,
    children: [
      {
        title: "查看代理",
        path: "/agent",
        component: PageComponent.AgentHome,
        exact: true
      },
      {
        title: "代理设置",
        path: "/agent/setting",
        component: PageComponent.AgentSetting,
        exact: true
      },
      {
        title: "创建代理",
        path: "/agent/create",
        component: PageComponent.AgentCreate
      }
    ]
  },
  {
    // PlEASE set up a DEFAULT route&component if there are some child routes
    icon: "customer-app",
    title: "客户端CMS",
    path: "/client/home",
    component: PageComponent.ClientHome,
    children: [
      {
        title: "Home",
        path: "/client/home",
        component: PageComponent.ClientHome
      },
      {
        title: "Our Case",
        path: "/client/case",
        component: PageComponent.ClientCase
      }
    ]
  },
  {
    icon: "qrcode",
    title: "生成二维码",
    path: "/qrcode",
    component: PageComponent.QRcode,
    exact: true
  },
  {
    icon: "wallet",
    title: "价格服务",
    path: "/labelone",
    exact: true,
    component: PageComponent.LabelOne
  },
  {
    // PlEASE set up a DEFAULT route&component if there are some child routes
    icon: "faq",
    title: "FQA管理",
    path: "/fqa/search",
    component: PageComponent.FqaSearch,
    children: [
      {
        title: "创建FQA",
        path: "/fqa/create",
        component: PageComponent.FqaCreate
      },
      {
        title: "查询FQA",
        path: "/fqa/search",
        component: PageComponent.FqaSearch
      }
    ]
  },
  {
    // PlEASE set up a DEFAULT route&component if there are some child routes
    icon: "system-setting",
    title: "设置",
    path: "/setting/locations",
    component: PageComponent.LocationSettings,
    children: [
      {
        title: "管理地区",
        path: "/setting/locations",
        component: PageComponent.LocationSettings
      }
    ]
  }
];
