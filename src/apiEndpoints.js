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
    takePlatllo: "/order/assign",
    finishPlatllo: "/order/finish",
    create: "/order",
    update: (id) => `/order/${id}`,
    delete: (id) => `/order/${id}`,
  },
  kitcheners: {
    getAll: "/kitchener",
    create: "/kitchener",
    update: (id) => `/kitchener/${id}`,
    delete: (id) => `/kitchener/${id}`,
  },
};

export default apiEndpoints;
