import { useCallback, useEffect, useState } from "react";
import useApiHooks from "../../api/BaseApi";
import BoardHeader from "../../components/Header/HeaderBoard";
import LayoutUserExist from "../../components/Layout/LayoutUserExist";
import "./chat.css";
import { UserState } from "../../state/User";
import { useRecoilValue } from "recoil";
import BtnFloat from "../../components/Button/BtnFloat";
import { useNavigate } from "react-router-dom";
import BottomTabNavigation from "../../components/Navigation/NavigationBottom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import ImgWrapper from "../../components/Wrapper/ImgWrapper";
export default function Chat() {
  const user = useRecoilValue(UserState);
  const navigate = useNavigate();
  const [chatRoomList, setChatRoomList] = useState([]);
  const { getApi } = useApiHooks();
  useEffect(() => {
    getApi({ url: "/api/chat-room/list" }).then((resp) => {
      const { data } = resp.data;
      if (Array.isArray(data)) {

        setChatRoomList(data);
      }
    });


  }, []);
  const goChatRoom=useCallback((chatRoomId,targetId)=>{
    navigate("/chat/room",{state:{chatRoomId:chatRoomId,targetId:targetId,senderId:user.userId}})
  },[])
  return (
    <LayoutUserExist>
      <div id="main">
        <BoardHeader title="상담 채팅" />
        <div className="content">
          <div className="list-col">
            {chatRoomList.map(c=>{
              return <div className="list-item v-exp" onClick={_=>{
                goChatRoom(c.chatRoomId,c.partnerId);
              }}>
                <div><ImgWrapper src={process.env.REACT_APP_API_URL + c.userImage} width={"40px"} height={"40px"}/></div>
                <div className="chat-content">
                  <div>{c.name}</div>
                  <div className="msg">{c.lastMessage}</div>
                </div>
                <div className="chat-dt">
                  {(new Date()).format('yyyy-MM-dd')===(new Date(c.lastMessageTime)).format('yyyy-MM-dd')?(new Date(c.lastMessageTime)).format('a/p HH:mm:ss'):(new Date(c.lastMessageTime)).format('yyyy-MM-dd HH:mm:ss')}
                </div>
              </div>
            })}

          </div>
          {user.role === "OWNER" && (
            <BtnFloat
              onClick={() => {
                navigate("/chat/create");
              }}
              icon={<FontAwesomeIcon icon={faComment} />}
            />
          )}

        </div>
        <BottomTabNavigation/>
      </div>
    </LayoutUserExist>
  );
}
