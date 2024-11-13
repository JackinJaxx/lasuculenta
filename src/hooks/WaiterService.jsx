import { useState } from "react";
import fetchData from "@utils/FetchData";
import apiEndpoints from "@/apiEndpoints";

const useWaiters = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // URL base de la API
  const baseUrl = import.meta.env.VITE_BASE_URL;

  // Función para obtener la lista de meseros
  const fetchWaiters = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchData(baseUrl + apiEndpoints.waiters.getAll);
      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // Función para guardar un nuevo mesero
  const saveWaiter = async (ingredient) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchData(baseUrl + apiEndpoints.waiters.create, {
        method: "POST",
        body: ingredient,
      });
      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const bestWaiters = async (since, from) => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchData(
        baseUrl + apiEndpoints.waiters.getBest + `?since=${since}&from=${from}`
      );
      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchWaiters, saveWaiter, bestWaiters };
};

export default useWaiters;
