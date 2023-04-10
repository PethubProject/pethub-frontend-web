import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HeaderChat from "../../components/Header/HeaderChat";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import "./chat.css";
import { useEffect, useRef, useState } from "react";
export default function Chat() {
  const contentRef = useRef();
  const [inputTop, setInputTop] = useState(0);
  const [text, setText] = useState("");
  const [chatList, setChatList] = useState([
    {
      memberId: "user1",
      content:
        "메세지 이유1&&메세지 이유1&&메세지 이유1\n메세지 이유1\n메세지 이유1\n메세지 이유1",
      created_at: "2023-04-04",
    },
    { memberId: "user3", content: "메세지 이유2", created_at: "2023-04-04" },
    { memberId: "user1", content: "메세지 이유3", created_at: "2023-04-04" },
    { memberId: "user3", content: "메세지 이유4", created_at: "2023-04-04" },
    { memberId: "user1", content: "메세지 이유5", created_at: "2023-04-04" },
    { memberId: "user1", content: "메세지 이유6", created_at: "2023-04-04" },
    { memberId: "user3", content: "메세지 이유7", created_at: "2023-04-04" },
    { memberId: "user1", content: "메세지 이유8", created_at: "2023-04-04" },
  ]);
  const me = "user3";
  const onSendHandler = (text) => {
    if (text.replace(/[\s]+/gi, "").length == 0) {
      alert("메세지를 입력해 주세요.");
    }
    setChatList((p) => [
      ...p,
      { memberId: "user3", content: text, created_at: "20223-04-04" },
    ]);
    setText("");
  };
  const scrollBottom = () => {
    contentRef.current.scrollTop = contentRef.current.scrollHeight;
  };
  useEffect(() => {
    scrollBottom();
  }, [chatList, inputTop]);

  useEffect(() => {
    const resize = (e) => {
      setInputTop(Math.random());
    };
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div id="main">
      <HeaderChat
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div className="chat-item-user">
              {me.substring(0, 1)}
              {me.substring(4, 5)}
            </div>
            User3
          </div>
        }
      />
      <div
        className="content pb20"
        ref={contentRef}
        onResize={(e) => setInputTop("resized")}
      >
        <div id="chat-list">
          {chatList.map((d) => {
            return (
              <div
                className={
                  me === d.memberId
                    ? "chat-item chat-me"
                    : "chat-item chat-other"
                }
                key={Math.random()}
              >
                <div className="chat-item-user">
                  {d.memberId.substring(0, 1)}
                  {d.memberId.substring(4, 5)}
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
            onChange={(e) => {
              setText(e.target.value);
            }}
            value={text}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                onSendHandler(text);
              }
            }}
            // onFocus={(e) => {
            //   setInputTop(true);
            // }}
            // onBlur={(e) => {
            //   setInputTop(false);
            // }}
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
              onSendHandler(text);
            }}
          >
            전송
          </div>
        </div>
      </div>
    </div>
  );
}
