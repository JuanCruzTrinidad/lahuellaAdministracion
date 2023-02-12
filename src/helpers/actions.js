export const fetchData = async (tableName) => {
  const response = await fetch(process.env.URL_FETCH_DATA, {
    method: "POST",
    body: JSON.stringify({tableName}),
    headers: { "api-key": process.env.API_KEY }
  });
  return await response.json();
};

export const fetchById = async (tableName, id) => {
  const response = await fetch(process.env.URL_FETCH_BY_ID, {
    method: "POST",
    body: JSON.stringify({ tableName, id }),
    headers: { "api-key": process.env.API_KEY },
  });
  return await response.json();
};
export const putData = async (tableName, item) => {
  const response = await fetch(process.env.URL_PUT_DATA, {
    method: "POST",
    body: JSON.stringify({ tableName, item }),
    headers: { "api-key": process.env.API_KEY },
  });
  return await response.json();
};

export const deleteById = async (tableName, id) => {
  const response = await fetch(process.env.URL_DELETE_BY_ID, {
    method: "POST",
    body: JSON.stringify({ tableName, id }),
    headers: { "api-key": process.env.API_KEY },
  });
  return await response.json();
};
