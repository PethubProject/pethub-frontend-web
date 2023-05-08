import axios from "axios";

export const postApi = async ({
  url,
  data,
  fail = () => {},
  success = () => {},
}) => {
  let result;
  try {
    result = await axios.post(process.env.REACT_APP_API_URL + url, data, {
      withCredentials: true,
      validateStatus: false,
    });
    if (result.status === 404) {
      result = null;
    }
  } catch (err) {
    console.log("err", err);
    throw err;
  }
  return result;
};
