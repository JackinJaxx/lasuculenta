const apiEndpoints = {
  platillos: {
    getAll: "/dish",
    create: "/platillos",
    update: (id) => `/platillos/${id}`,
    delete: (id) => `/platillos/${id}`,
  },
  bebidas: {
    calientes: "/bebidas/calientes",
    frias: "/bebidas/frias",
  },
  desayunos: "/desayunos",
  pasteleria: "/pasteleria-panaderia",
  waiters: {
    getAll: "/waiter",
    create: "/waiter",
    update: (id) => `/waiter/${id}`,
    delete: (id) => `/waiter/${id}`,
  }
};

export default apiEndpoints;
