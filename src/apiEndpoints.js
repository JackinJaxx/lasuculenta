const apiEndpoints = {
  platillos: {
    getAll: "/dish",
    create: "/platillos",
    update: (id) => `/platillos/${id}`,
    delete: (id) => `/platillos/${id}`,
  },
  waiters: {
    getAll: "/waiter",
    create: "/waiter",
    update: (id) => `/waiter/${id}`,
    delete: (id) => `/waiter/${id}`,
  },
  orders: {
    getAll: "/order",
    getOrdersToMade: "/order/to-made",
    getOrdersReady: "/order/ready",
    takeDelivery: "/order/deliver",
    takePlatllo: "/order/assign",
    finishPlatllo: "/order/finish",
    create: "/order",
    filter: "/order/filter",
  },
  kitcheners: {
    getAll: "/kitchener",
    create: "/kitchener",
    update: (id) => `/kitchener/${id}`,
    delete: (id) => `/kitchener/${id}`,
  },
};

export default apiEndpoints;
