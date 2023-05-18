import axios from "axios";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { UserState } from "../state/User";
import { useNavigate } from "react-router-dom";
export const postApi = async ({ url, data }) => {
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
  return result;
};

const useApiHooks = () => {
  const userReset = useResetRecoilState(UserState);
  const navigate = useNavigate();
  const postApi = async ({ url, data }) => {
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
      if (err.response.status === 401) {
        userReset();
        navigate("/");
      }
      throw err;
    }
    return result;
  };
  const putApi = async ({ url, data }) => {
    let result;
    try {
      result = await axios.put(process.env.REACT_APP_API_URL + url, data, {
        withCredentials: true,
        validateStatus: false,
      });
      if (result.status === 401) {
        userReset();
        navigate("/");
      }
    } catch (err) {
      if (err.response.status === 401) {
        userReset();
        navigate("/");
      }
      throw err;
    }
    return result;
  };
  const getApi = async ({ url, data }) => {
    let result;
    try {
      result = await axios.get(process.env.REACT_APP_API_URL + url, data, {
        withCredentials: true,
        validateStatus: false,
      });
      if (result.status === 401) {
        userReset();
        navigate("/");
      }
    } catch (err) {
      if (err.response.status === 401) {
        userReset();
        navigate("/");
      }
      throw err;
    }
    return result;
  };

  const fileUpload = async ({ url, data }) => {
    let result;

    try {
      result = await axios.post(process.env.REACT_APP_API_URL + url, data, {
        withCredentials: true,
        validateStatus: false,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (result.status === 401) {
        userReset();
        navigate("/");
      }
    } catch (err) {
      console.log("err", err);
      throw err;
    }
    return result;
  };

  return {
    getApi,
    postApi,
    putApi,
    fileUpload,
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
    apiSignIn: async (data) => {
      const state = { ok: false, msg: "", data: {} };
      let result = await postApi({
        url: "/api/auth/login",
        data: data,
      });
      if (result.status === 400) {
        state.msg = result.data;
        return state;
      }
      if (result.status === 200) {
        state.ok = true;
        state.msg = "로그인 성공";
        state.data = result.data;
      }
      return state;
    },
    apiSignUp: async (user, callBack = () => {}) => {
      const state = { ok: false, msg: "", data: {} };
      let result = await postApi({
        url: "/api/auth/duplicate-email",
        data: user,
      });

      if (result.status !== 200) {
        state.msg = "이메일이 존재합니다.";
        return state;
      }
      result = await postApi({
        url: "/api/auth/duplicate-nickname",
        data: user,
      });
      if (result.status !== 200) {
        state.msg = "닉네임이 존재합니다.";
        return state;
      }
      result = await postApi({
        url: "/api/auth/duplicate-phone",
        data: user,
      });
      if (result.status !== 200) {
        state.msg = "전화번호가 존재합니다.";
        return state;
      }
      result = await postApi({
        url: "/api/auth/join",
        data: user,
      });
      if (result.status === 200) {
        state.ok = true;
        state.msg = "회원가입 성공";
      }
      return state;
    },
  };
};

export default useApiHooks;
