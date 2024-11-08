const apiEndpoints = {
  platillos: "/platillos",
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
