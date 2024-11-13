import { useState } from "react";
import fetchData from "@utils/FetchData";
import apiEndpoints from "@/apiEndpoints";

const useKitchener = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // URL base de la API
  const baseUrl = import.meta.env.VITE_BASE_URL;

  // Función para obtener la lista de meseros
  const fetchKitcheners = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchData(baseUrl + apiEndpoints.kitcheners.getAll);
      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const saveKitchener = async (ingredient) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchData(baseUrl + apiEndpoints.kitcheners.create, {
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

  const bestKitchener = async (since, from) => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchData(
        baseUrl +
          apiEndpoints.kitcheners.getBest +
          `?since=${since}&from=${from}`
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
    fetchKitcheners,
    saveKitchener,
    bestKitchener,
  };
};

export default useKitchener;
