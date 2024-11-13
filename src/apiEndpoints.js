import { get } from "react-hook-form";

const apiEndpoints = {
  platillos: {
    getAll: "/dish",
    create: "/dish",
    getAllCost: "/dish/selltable",
    update: (id) => `/platillos/${id}`,
    delete: (id) => `/platillos/${id}`,
  },
  ingredient:{
    getAll: "/ingredient",
    predict: "/ingredient/predict",
    create: "/ingredient",
    update: "/ingredient",
    delete: (id) => `/ingredient?uuid=${id}`,
  },
  waiters: {
    getAll: "/waiter",
    create: "/waiter",
    getBest: "/waiter/best",
    update: (id) => `/waiter/${id}`,
    delete: (id) => `/waiter/${id}`,
  },
  orders: {
    getAll: "/order/pages",
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
    getBest: "/kitchener/best",
    update: (id) => `/kitchener/${id}`,
    delete: (id) => `/kitchener/${id}`,
  },
};

export default apiEndpoints;
