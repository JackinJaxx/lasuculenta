const fetchData = async (
  url,
  { method = "GET", headers = {}, body = null, expectJson = true } = {}
) => {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...(body && { body: JSON.stringify(body) }),
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Error HTTP! Status: ${response.status}`);
  }

  return expectJson ? await response.json() : await response.text();
};

export default fetchData;
