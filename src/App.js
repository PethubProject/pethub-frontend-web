import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Main from "./pages/Main/Main";
import SignIn from "./pages/Sign/SignIn";
import SignUp from "./pages/Sign/SignUp";
import FreeBoardContent from "./pages/FreeBoard/FreeBoardContent";
import FreeBoardUpdate from "./pages/FreeBoard/FreeBoardUpdate";
import FreeBoardInsert from "./pages/FreeBoard/FreeBoardInsert";
import Camera from "./pages/Camera/Camera";
import Modal from "./components/Modal/Modal";
import FreeBoardList from "./pages/FreeBoard/FreeBoardList";
import TeleHealth from "./pages/TeleHealth/TeleHealth";
import More from "./pages/More/More";
import CameraDetail from "./pages/Camera/CameraDetail";
import CounselList from "./pages/CounselBoard/CounselList";
import CounselContent from "./pages/CounselBoard/CounselContent";
import CounselInsert from "./pages/CounselBoard/CounselInsert";
import CounselUpdate from "./pages/CounselBoard/CounselUpdate";
import CounselAnswerInsert from "./pages/CounselBoard/CounselAnswerInsert";
import CounselAnswerUpdate from "./pages/CounselBoard/CounselAnswerUpdate";
import Chat from "./pages/Chat/Chat";
import BeforeInstallPopup from "./components/Install/BeforeInstallPopup";
import axios from "axios";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { UserState } from "./state/User";
import UserInfo from "./pages/UserInfo/UserInfo";
import PetDetail from "./pages/PetInfo/PetDetail";
import PetInsert from "./pages/PetInfo/PetInsert";
import PetUpdate from "./pages/PetInfo/PetUpdate";
import PetList from "./pages/PetInfo/PetList";
import VetInfo from "./pages/VetInfo/VetInfo";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />

          {/* sign */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* UserInfo */}
          <Route path="/userinfo" element={<UserInfo />} />
          {/* VetInfo */}
          <Route path="/vetinfo" element={<VetInfo />} />

          {/* TeleHealth */}
          <Route path="/telehealth" element={<TeleHealth />} />

          {/* more */}
          <Route path="/more" element={<More />} />

          {/* freeboard */}
          <Route path="/freeboard" element={<FreeBoardList />} />
          <Route path="/freeboard/insert" element={<FreeBoardInsert />} />
          <Route path="/freeboard/update" element={<FreeBoardUpdate />} />
          <Route path="/freeboard/content" element={<FreeBoardContent />} />

          {/* counselboard */}
          <Route path="/counselboard" element={<CounselList />} />
          <Route path="/counselboard/content" element={<CounselContent />} />
          <Route path="/counselboard/insert" element={<CounselInsert />} />
          <Route path="/counselboard/update" element={<CounselUpdate />} />
          <Route
            path="/counselboard/answer/insert"
            element={<CounselAnswerInsert />}
          />
          <Route
            path="/counselboard/answer/update"
            element={<CounselAnswerUpdate />}
          />

          {/* PetInfo */}
          <Route path="/petinfo" element={<PetList />} />
          <Route path="/petinfo/insert" element={<PetInsert />} />
          <Route path="/petinfo/detail" element={<PetDetail />} />
          <Route path="/petinfo/update" element={<PetUpdate />} />

          {/* camera */}
          <Route path="/ai" element={<Camera />} />
          <Route path="/ai/result" element={<CameraDetail />} />

          {/* chat */}
          <Route path="/chat" element={<Chat />} />
        </Routes>
        <Modal />
        <BeforeInstallPopup />
      </BrowserRouter>
    </div>
  );
}

export default App;
