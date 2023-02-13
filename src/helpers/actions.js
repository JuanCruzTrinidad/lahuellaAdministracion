import axios from "axios";

export const fetchData = async (tableName) => {
  const response = await axios.post(
    process.env.REACT_APP_URL_FETCH_DATA,
    { tableName },
    {
      headers: { "api-key": process.env.REACT_APP_API_KEY },
    }
  );
  return await response.data;
};

export const fetchById = async (tableName, id) => {
  const response = await axios.post(
    process.env.REACT_APP_URL_FETCH_BY_ID,
    { tableName, id },
    {
      headers: { "api-key": process.env.REACT_APP_API_KEY },
    }
  );
  return await response.data;
};
export const putData = async (tableName, item) => {
  const response = await axios.post(
    process.env.REACT_APP_URL_PUT_DATA,
    { tableName, item },
    {
      headers: { "api-key": process.env.REACT_APP_API_KEY },
    }
  );
  return await response.data;
};

export const deleteById = async (tableName, id) => {
  const response = await axios.post(
    process.env.REACT_APP_URL_DELETE_BY_ID,
    { tableName, id },
    { headers: { "api-key": process.env.REACT_APP_API_KEY } }
  );
  return await response.json();
};
