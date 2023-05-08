import { postApi } from "./BaseApi";

export const apiSignUp = async (user, callBack = () => {}) => {
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
    url: "/api/auth/join",
    data: user,
  });
  if (result.status === 200) {
    state.ok = true;
    state.msg = "회원가입 성공";
  }
  return state;
};

export const apiSignIn = async (data) => {
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
};

export const apiSignOut = async () => {
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
};
