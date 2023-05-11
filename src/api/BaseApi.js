import axios from "axios";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { UserState } from "../state/User";
import { useNavigate } from "react-router-dom";
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
  } catch (err) {
    console.log("err", err);
    throw err;
  }
  console.log(result.headers["set-cookie"]);
  return result;
};

const useApiHooks = () => {
  const userReset = useResetRecoilState(UserState);
  const navigate = useNavigate();
  const postApi = async ({
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
      if (result.status === 401) {
        userReset();
        navigate("/");
      }
    } catch (err) {
      console.log("err", err);
      throw err;
    }
    console.log(result.headers["set-cookie"]);
    return result;
  };
  return {
    postApi,
    apiSignOut: async () => {
      const state = { ok: false, msg: "", data: {} };
      let result = await postApi({
        url: "/api/auth/logout",
        data: {},
      });

      if (result.status === 200) {
        state.ok = true;
        state.msg = "로그아웃 성공";
      } else {
        state.msg = result.data;
      }
      return state;
    },
  };
};

export default useApiHooks;
