import { useState } from "react";
import fetchData from "@utils/FetchData";
import apiEndpoints from "@/apiEndpoints";

const useIngredient = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // URL base de la API
  const baseUrl = import.meta.env.VITE_BASE_URL;

  // Función para obtener la lista de meseros
  const fetchIngredients = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchData(baseUrl + apiEndpoints.ingredient.getAll);
      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const predictIngredients = async (date) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchData(
        baseUrl + apiEndpoints.ingredient.predict + `?from=${date}`
      );
      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const addIngredient = async (ingredient) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchData(baseUrl + apiEndpoints.ingredient.create, {
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

  const deleteIngredient = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchData(
        baseUrl + apiEndpoints.ingredient.delete(id),
        {
          method: "DELETE",
        }
      );
      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateIngredient = async (ingredient) => {
    setLoading(true);
    setError(null);

    return fetchData(baseUrl + apiEndpoints.ingredient.update, {
      method: "PUT",
      body: ingredient,
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

  return {
    data,
    loading,
    error,
    fetchIngredients,
    predictIngredients,
    addIngredient,
    deleteIngredient,
    updateIngredient,
  };
};

export default useIngredient;
