import { faComment } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from "react";
import useApiHooks from "../../api/BaseApi";
import BtnFloat from "../../components/Button/BtnFloat";
import BoardHeader from "../../components/Header/HeaderBoard";
import LayoutUserExist from "../../components/Layout/LayoutUserExist";
import BottomTabNavigation from "../../components/Navigation/NavigationBottom";
import "./chat.css";
import ImgWrapper from "../../components/Wrapper/ImgWrapper";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { UserState } from "../../state/User";

export default function ChatRoomCreate() {
  const [vetList, setVetList] = useState([]);
  const { getApi, postApi } = useApiHooks();
  const user = useRecoilValue(UserState);
  const navigate = useNavigate();
  useEffect(() => {
    getApi({ url: "/api/vet/vets/0" }).then((resp) => {
      const { content } = resp.data;
      if (Array.isArray(content)) {
        setVetList(content);
      }
    });
  }, []);
  const createRoom = useCallback((targetId) => {
    getApi({ url: `/api/exist/chat/${targetId}` }).then((resp) => {
      const { data } = resp.data;
      console.log(data)
      if (!data.status) {
        postApi({ url: `/api/create/chat-room/${targetId}` }).then((resp) => {
          navigate("/chat/room", { state: { targetId: targetId ,chatRoomId:resp.data.data.roomId,senderId:user.userId} });
        });
      } else {
        navigate("/chat/room", { state: { targetId: targetId ,chatRoomId:data.roomId,senderId:user.userId} });
      }
    });
  }, []);
  return (
    <LayoutUserExist>
      <div id="main">
        <BoardHeader title="상담 채팅" />
        <div className="content">
          <div className="list-col">
            {vetList.map((d) => {
              console.log(d);
              return (
                <div
                  key={Math.random()}
                  className="list-item  v-exp"
                  onClick={(_) => {
                    createRoom(d.userId);
                  }}
                >
                  <div className="p0">
                    <ImgWrapper src={process.env.REACT_APP_API_URL + d.vetImage} width={"40px"} height={"40px"} />
                  </div>
                  <div>{d.name}</div>
                </div>
              );
            })}
          </div>
        </div>
        <BottomTabNavigation />
      </div>
    </LayoutUserExist>
  );
}
