import React, { useCallback } from "react";
import { getMessaging, onMessage, getToken } from "firebase/messaging";
import { useNavigate } from "react-router-dom";
import firebaseApp from "../../utils/fcm";

export default function Main() {
  const messaging = getMessaging(firebaseApp);
  getToken(messaging, {
    vapidKey:
      "BD8mJ8xCqap4NyEeS6Ft_NAhyEaMQ4fM9gr6fcGHDOtGV5Q68MUhzdfybGzEF8N61qrpel_CSfO7Cm7nF6kUeDw",
  }).then((ct) => console.log(ct));
  onMessage(messaging, (payload) => {
    console.log(payload);
  });
  const nav = useNavigate();
  const onClick = useCallback((path) => {
    nav(path);
  }, []);
  return (
    <div id="main">
      <div>
        <button
          onClick={() => {
            onClick("/freeboard");
          }}
        >
          자유게시판
        </button>
        <button
          onClick={() => {
            onClick("/camera");
          }}
        >
          카메라
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            onClick("/signin");
          }}
        >
          로그인
        </button>
        <button
          onClick={() => {
            onClick("/signup");
          }}
        >
          회원가입
        </button>
        <button
          onClick={() => {
            onClick("/signout");
          }}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}
