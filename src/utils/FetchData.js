const fetchData = async (
  url,
  { method = "GET", headers = {}, body = null, expectJson = true, timeout = 4000 } = {} // Agregamos el parámetro timeout en milisegundos
) => {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...(body && { body: JSON.stringify(body) }),
  };

  // Crear una promesa de timeout que rechaza después del tiempo especificado
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Request timed out")), timeout)
  );

  // Usamos Promise.race para que la solicitud se cancele si se supera el límite de tiempo
  const fetchPromise = fetch("http://"+ url, options);

  const response = await Promise.race([fetchPromise, timeoutPromise]);

  if (!response.ok) {
    throw new Error(`Error HTTP! Status: ${response.status}`);
  }

  return expectJson ? await response.json() : await response.text();
};

export default fetchData;
