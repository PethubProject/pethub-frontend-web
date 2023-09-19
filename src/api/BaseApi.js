import axios from "axios";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { UserInit, UserState } from "../state/User";
import { useNavigate } from "react-router-dom";
import { loading } from "../components/Utils/Loading";
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

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  validateStatus: false,
});
api.interceptors.request.use(
  function (config) {
    loading.on();
    return config;
  },
  function (err) {
    loading.off();
    return Promise.reject(err);
  }
);
api.interceptors.response.use(
  function (response) {
    loading.off();
    return response;
  },
  async function (error) {
    loading.off();
    console.log(error)
    if (error.response.status === 401) {
    }
    return Promise.reject(error);
  }
);

const useApiHooks = () => {
  const setUser = useSetRecoilState(UserState)
  const userReset = ()=>{
    setUser(UserInit);
  }
  const navigate = useNavigate();
  const postApi = async ({ url, data }) => {
    let result;
    try {
      result = await api.post(url, data, {});
      if (result.status === 401) {
        userReset();
        navigate("/signin");
      }
    } catch (err) {
      if (err.code === "ERR_NETWORK") {
        throw err;
      } else if (err.code === "ERR_CONNECTION_REFUSED") {
        throw err;
      }else if (err.code === "ERR_INCOMPLETE_CHUNKED_ENCODING") {
        throw err;
      }
      if (err.response.status === 401) {
        userReset();
        navigate("/signin");
      }
      throw err;
    }
    return result;
  };
  const postApiWithFile = async ({ url, data }) => {
    let result;
    try {
      result = await api.post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (result.status === 401) {
        userReset();
        navigate("/signin");
      }
    } catch (err) {
      if (err.code === "ERR_NETWORK") {
        throw err;
      } else if (err.code === "ERR_CONNECTION_REFUSED") {
        throw err;
      }else if (err.code === "ERR_INCOMPLETE_CHUNKED_ENCODING") {
        throw err;
      }
      if (err.response.status === 401) {
        userReset();
        navigate("/signin");
      }
      throw err;
    }
    return result;
  };
  const putApi = async ({ url, data }) => {
    let result;
    try {
      result = await api.put(url, data, {});
      if (result.status === 401) {
        userReset();
        navigate("/signin");
      }
    } catch (err) {
      if (err.code === "ERR_NETWORK") {
        throw err;
      } else if (err.code === "ERR_CONNECTION_REFUSED") {
        throw err;
      }else if (err.code === "ERR_INCOMPLETE_CHUNKED_ENCODING") {
        throw err;
      }
      if (err.response.status === 401) {
        userReset();
        navigate("/signin");
      }
      throw err;
    }
    return result;
  };
  const getApi = async ({ url, data }) => {
    let result;
    try {
      result = await api.get(url, {
        params: data,
      });
    
      if (result.status === 401) {
        userReset();
        navigate("/signin");
      }
    } catch (err) {
      if (err.code === "ERR_NETWORK") {
        throw err;
      } else if (err.code === "ERR_CONNECTION_REFUSED") {
        throw err;
      }else if (err.code === "ERR_INCOMPLETE_CHUNKED_ENCODING") {
        throw err;
      }

      if (err.response.status === 401) {
        userReset();
        navigate("/signin");
      }
      throw err;
    }
    return result;
  };
  const deleteApi = async ({ url, data }) => {
    let result;
    try {
      result = await api.delete(url, {
        params: data,
      });
      if (result.status === 401) {
        userReset();
        navigate("/signin");
      }
    } catch (err) {
      if (err.code === "ERR_NETWORK") {
        throw err;
      } else if (err.code === "ERR_CONNECTION_REFUSED") {
        throw err;
      }else if (err.code === "ERR_INCOMPLETE_CHUNKED_ENCODING") {
        throw err;
      }
      if (err.response.status === 401) {
        userReset();
        navigate("/signin");
      }
      throw err;
    }
    return result;
  };

  const fileUpload = async ({ url, data }) => {
    let result;

    try {
      result = await api.post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (result.status === 401) {
        userReset();
        navigate("/signin");
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
    postApiWithFile,
    putApi,
    deleteApi,
    fileUpload,
    apiSignOut: async () => {
      const state = { ok: false, msg: "", data: {} };
      let result = await postApi({
        url: "/api/user/logout",
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
        url: "/api/user/login",
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
        url: "/api/user/duplicate-email",
        data: user,
      });

      if (result.status !== 200) {
        state.msg = "이메일이 존재합니다.";
        return state;
      }
      result = await postApi({
        url: "/api/user/duplicate-nickname",
        data: user,
      });
      if (result.status !== 200) {
        state.msg = "닉네임이 존재합니다.";
        return state;
      }
      result = await postApi({
        url: "/api/user/duplicate-phone",
        data: user,
      });
      if (result.status !== 200) {
        state.msg = "전화번호가 존재합니다.";
        return state;
      }
      result = await postApi({
        url: "/api/user/join",
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
