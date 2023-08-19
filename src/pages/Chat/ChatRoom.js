import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import uuid from "react-uuid";
import { useRecoilValue } from "recoil";
import useApiHooks from "../../api/BaseApi";
import HeaderChat from "../../components/Header/HeaderChat";
import LayoutUserExist from "../../components/Layout/LayoutUserExist";
import ImgWrapper from "../../components/Wrapper/ImgWrapper";
import { UserState } from "../../state/User";
import "./chat.css";
import { useChat } from "../../common/hooks";
export default function ChatRoom() {
  // ref
  const ws = useRef();
  const contentRef = useRef();
  const textRef = useRef(null);

  const location = useLocation();
  const [inputTop, setInputTop] = useState(0);
  const [text, setText] = useState("");
  const [target, setTarget] = useState({
    name: "",
    nickName: "",
    partnerId: -1,
    userImage: "",
    chatMessageList: [],
  });
  const { getApi } = useApiHooks();
  const user = useRecoilValue(UserState);
  const onSendHandler = (text) => {
    if (text.replace(/[\s]+/gi, "").length === 0) {
      alert("메세지를 입력해 주세요.");
      return;
    }
    ws.current.send(JSON.stringify({ type: "MESSAGE", chatId: uuid(), senderId: user.userId, recipientId: location.state.targetId, content: text, createdAt: new Date() }));
    textRef.current.value = "";
  };
  const scrollBottom = useCallback(() => {
    if (contentRef?.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [contentRef]);

  useEffect(() => {
    scrollBottom();
  }, [target, inputTop, contentRef]);

  useChat({
    ws: ws,
    onopen: (ws) => {
      console.log(ws)
      ws.current.send(JSON.stringify({ type: "ENTER", userId: location.state.senderId }));
    },
    onmessage: (ws,res) => {
      setTarget((p) => ({ ...p, chatMessageList: [...p.chatMessageList, res] }));
    },
  });

  // 웹소켓 통신
  // useEffect(() => {
  //   ws.current = new WebSocket(`${process.env.REACT_APP_SOCKET_URL}/chat`);

  //   // 1. opopen
  //   ws.current.onopen = () => {
  //     ws.current.send(JSON.stringify({ type: "ENTER", userId: location.state.senderId }));
  //     // ws.current.send(JSON.stringify({type:"MESSAGE","chatId":uuid(),"senderId":user.userId,recipientId:location.state.targetId,content:"as11das",createdAt:new Date()}))
  //   };

  //   ws.current.onclose = (error) => {
  //     console.log("disconnect from ");
  //     console.log(error);
  //   };

  //   ws.current.onmessage = function (event) {
  //     const res = JSON.parse(event.data);
  //     setTarget((p) => ({ ...p, chatMessageList: [...p.chatMessageList, res] }));
  //   };

  //   ws.current.onerror = (error) => {
  //     console.log("connection error ");
  //     console.log(error);
  //   };

  //   return () => {
  //     ws.current.close();
  //   };
  // }, []);

  useEffect(() => {
    // 마운트 할때
    const resize = (e) => {
      setInputTop(Math.random());
    };
    window.addEventListener("resize", resize);
    getApi({ url: `/api/chat/list/${location.state.chatRoomId}` }).then((resp) => {
      setTarget(resp.data.data);
    });

    // 마운트 해제 될때
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    const tmOnSend = (e) => {
      if (e.key === "Enter") {
        onSendHandler(e.target.value);
      }
      // if(e.Key)
    };
    if (textRef?.current !== null) {
      textRef.current.addEventListener("keyup", tmOnSend);
    }
    return () => {
      if (textRef?.current !== null) {
        textRef.current.removeEventListener("keyup", tmOnSend);
      }
    };
  }, [textRef]);
  return (
    // JSX
    <LayoutUserExist>
      <div id="main">
        <HeaderChat
          title={
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div className="chat-item-user">
                <ImgWrapper src={process.env.REACT_APP_API_URL + target.userImage} width={"100%"} height={"100%"} />
              </div>
              {target.name}
            </div>
          }
        />
        <div className="content pb20" ref={contentRef} onResize={(e) => setInputTop("resized")}>
          <div id="chat-list">
            {target.chatMessageList.map((d) => {
              return (
                <div className={user.userId === d.senderId ? "chat-item chat-me" : "chat-item chat-other"} key={Math.random()}>
                  <div className="chat-item-user">
                    <ImgWrapper src={`${process.env.REACT_APP_API_URL}${user.userId === d.senderId ? user.userImage : target.userImage}`} width={"100%"} height={"100%"} />
                  </div>
                  <div className="chat-item-content">
                    <p>{d.content}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div id="chat-input-wrap">
          <div id="chat-input-area">
            <input
              type="text"
              // onChange={e=>setText(e.target.value)}
              // value={text}
              // onKeyUp={(e) => {
              //   if (e.key === "Enter") {
              //     onSendHandler(text);
              //   }
              // }}
              ref={textRef}
              placeholder="메세지를 입력해주세요."
            />
            <div id="chat-file-area">
              <label className="pointer" htmlFor="file-upload">
                <FontAwesomeIcon icon={faPaperclip} />
              </label>
              <input type="file" id="file-upload" style={{ display: "none" }} />
            </div>
          </div>
          <div id="btn-chat-send">
            <div
              onClick={(e) => {
                e.preventDefault();
                onSendHandler(textRef.current.value);
              }}
            >
              전송
            </div>
          </div>
        </div>
      </div>
    </LayoutUserExist>
  );
}
