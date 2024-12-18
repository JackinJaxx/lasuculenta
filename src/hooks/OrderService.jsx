import { useState } from "react";
import fetchData from "@utils/FetchData";
import apiEndpoints from "@/apiEndpoints";

const useOrders = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // URL base de la API
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const fetchOrders = async (size, page) => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchData(
        baseUrl + apiEndpoints.orders.getAll + `?size=${size}&page=${page}`
      );
      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const getOrdeToMade = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchData(
        baseUrl + apiEndpoints.orders.getOrdersToMade
      );
      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const getOrdersReady = () => {
    setLoading(true);
    setError(null);
    console.log("Fetching orders ready...");
    return fetchData(baseUrl + apiEndpoints.orders.getOrdersReady)
      .then((response) => {
        return response.content; // Resuelve la promesa con la respuesta
      })
      .catch((error) => {
        return Promise.reject(error); // Rechaza la promesa con el error
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const takeDelivery = (order) => {
    setLoading(true);
    setError(null);

    return fetchData(baseUrl + apiEndpoints.orders.takeDelivery, {
      method: "PUT",
      body: order,
    })
      .then((response) => {
        return response; // Resuelve la promesa con la respuesta
      })
      .catch((error) => {
        setError(error);
        return Promise.reject(error); // Rechaza la promesa con el error
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const takePlatlloByFilter = (filter) => {
    setLoading(true);
    setError(null);

    return fetchData(baseUrl + apiEndpoints.orders.filter, {
      method: "POST",
      body: filter,
    })
      .then((response) => {
        return response; // Resuelve la promesa con la respuesta
      })
      .catch((error) => {
        return Promise.reject(error); // Rechaza la promesa con el error
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const takePlatllo = (platillo) => {
    setLoading(true);
    setError(null);

    return fetchData(baseUrl + apiEndpoints.orders.takePlatllo, {
      method: "PUT",
      body: platillo,
    })
      .then((response) => {
        return response; // Resuelve la promesa con la respuesta
      })
      .catch((error) => {
        setError(error);
        return Promise.reject(error); // Rechaza la promesa con el error
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const completePlatllo = (platillo) => {
    setLoading(true);
    setError(null);

    return fetchData(baseUrl + apiEndpoints.orders.finishPlatllo, {
      method: "PUT",
      body: platillo,
    })
      .then((response) => {
        return response; // Resuelve la promesa con la respuesta
      })
      .catch((error) => {
        setError(error);
        return Promise.reject(error); // Rechaza la promesa con el error
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Función para guardar un nuevo platillo
  const saveOrder = (order) => {
    setLoading(true);
    setError(null);

    return fetchData(baseUrl + apiEndpoints.orders.create, {
      method: "POST",
      body: order,
    })
      .then((response) => {
        setData((prevData) => [...prevData, response]);
        return response; // Resuelve la promesa con la respuesta
      })
      .catch((error) => {
        setError(error);
        return Promise.reject(error); // Rechaza la promesa con el error
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getProcess = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchData(baseUrl + apiEndpoints.orders.process);
      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const getSold = async (since, until) => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchData(
        baseUrl + apiEndpoints.orders.sold + `?since=${since}&until=${until}&page=0&size=100`
      );
      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    fetchOrders,
    saveOrder,
    getOrdeToMade,
    takePlatllo,
    takePlatlloByFilter,
    completePlatllo,
    getOrdersReady,
    takeDelivery,
    getProcess,
    getSold,
  };
};

export default useOrders;
