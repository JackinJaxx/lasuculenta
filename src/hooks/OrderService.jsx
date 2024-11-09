import { useState } from "react";
import fetchData from "@utils/FetchData";
import apiEndpoints from "@/apiEndpoints";

const useOrders = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // URL base de la API
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchData(baseUrl + apiEndpoints.orders.getAll);
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

  return {
    data,
    loading,
    error,
    fetchOrders,
    saveOrder,
    getOrdeToMade,
    takePlatllo,
  };
};

export default useOrders;
