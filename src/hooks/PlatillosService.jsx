import { useState } from "react";
import fetchData from "@utils/FetchData";
import apiEndpoints from "@/apiEndpoints";

const usePlatillos = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // URL base de la API
  const baseUrl = import.meta.env.VITE_BASE_URL;

  // Función para obtener la lista de platillos
  const fetchPlatillos = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchData(baseUrl + apiEndpoints.platillos.getAll);
      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const saveDish = async (ingredient) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchData(baseUrl + apiEndpoints.platillos.create, {
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

  const getAllSellTable = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchData(baseUrl + apiEndpoints.platillos.getAllCost);
      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchPlatillos, saveDish , getAllSellTable };
};

export default usePlatillos;
