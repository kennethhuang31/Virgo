import { lazy } from "react";

// agent area
export const AgentHome = lazy(() => import("pages/agent/agent-home"));
export const AgentCreate = lazy(() =>
  import("pages/agent/agent-create/agent-create")
);
export const AgentSetting = lazy(() =>
  import("pages/agent/agent-setting/agent-setting")
);
// client area
export const ClientCase = lazy(() =>
  import("pages/client/client-case/client-case")
);
export const ClientHome = lazy(() =>
  import("pages/client/client-home/client-home")
);
export const ClientPromotion = lazy(() =>
  import("pages/client/client-promotion/client-promotion")
);
export const ClientNotification = lazy(() =>
  import("pages/client/client-notification/client-notification")
);
// courier area
export const CourierCreate = lazy(() =>
  import("pages/courier/courier-create/courier-create")
);
export const CourierDetail = lazy(() =>
  import("pages/courier/courier-detail/courier-detail")
);
// customer area
export const CustomerHome = lazy(() => import("pages/customer/customer-home"));
export const CustomerDetail = lazy(() =>
  import("pages/customer/customer-detail/customer-detail")
);
// dashboard area
export const Dashboard = lazy(() => import("pages/dashboard/dashboard"));
// fqa area
export const FqaCreate = lazy(() => import("pages/fqa/fqa-create/fqa-create"));
export const FqaSearch = lazy(() => import("pages/fqa/fqa-search/fqa-search"));
// order area
export const OrdersHome = lazy(() => import("pages/orders/orders-home"));
export const OrdersDetail = lazy(() =>
  import("pages/orders/orders-detail/orders-detail")
);
// qrcode area
export const QRcode = lazy(() => import("pages/qrcode/qrcode"));
// user area
export const UserProfile = lazy(() =>
  import("pages/user/user-profile/user-profile")
);
// wallet area
export const Wallet = lazy(() => import("pages/wallet/wallet"));
// setting area
export const Settings = lazy(() => import("pages/settings/settings"));
export const LocationSettings = lazy(() =>
  import("pages/settings/location-settings/location-settings")
);
export const WorkerSettings = lazy(() =>
  import("pages/settings/worker-settings/worker-settings")
);

export const Servicebreadcrubs = lazy(() =>
  import("pages/priceservicetime/servicebreadcrumbs/servicebreadcrubs")
);
export const LabelOne = lazy(() =>
  import("pages/priceservicetime/LabelOne/LabelOne")
);
export const LabelTwo = lazy(() =>
  import("pages/priceservicetime/LabelTwo/LabelTwo")
);
export const LabelThree = lazy(() =>
  import("pages/priceservicetime/LabelThree/LabelThree")
);
export const LabelFour = lazy(() =>
  import("pages/priceservicetime/LabelFour/LabelFour")
);
export const LabelFive = lazy(() =>
  import("pages/priceservicetime/LabelFive/LabelFive")
);
export const LabelSix = lazy(() =>
  import("pages/priceservicetime/LabelSix/LabelSix")
);
export const LabelSeven = lazy(() =>
  import("pages/priceservicetime/LabelSeven/LabelSeven")
);
