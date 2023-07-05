import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import BeforeInstallPopup from "./components/Install/BeforeInstallPopup";
import Modal from "./components/Modal/Modal";
import Camera from "./pages/Camera/Camera";
import CameraDetail from "./pages/Camera/CameraDetail";
import Chat from "./pages/Chat/Chat";
import CounselAnswerInsert from "./pages/CounselBoard/CounselAnswerInsert";
import CounselAnswerUpdate from "./pages/CounselBoard/CounselAnswerUpdate";
import CounselContent from "./pages/CounselBoard/CounselContent";
import CounselInsert from "./pages/CounselBoard/CounselInsert";
import CounselList from "./pages/CounselBoard/CounselList";
import CounselUpdate from "./pages/CounselBoard/CounselUpdate";
import FreeBoardContent from "./pages/FreeBoard/FreeBoardContent";
import FreeBoardInsert from "./pages/FreeBoard/FreeBoardInsert";
import FreeBoardList from "./pages/FreeBoard/FreeBoardList";
import FreeBoardUpdate from "./pages/FreeBoard/FreeBoardUpdate";
import Main from "./pages/Main/Main";
import More from "./pages/More/More";
import PetDetail from "./pages/PetInfo/PetDetail";
import PetInsert from "./pages/PetInfo/PetInsert";
import PetList from "./pages/PetInfo/PetList";
import PetUpdate from "./pages/PetInfo/PetUpdate";
import SignIn from "./pages/Sign/SignIn";
import SignUp from "./pages/Sign/SignUp";
import TeleHealth from "./pages/TeleHealth/TeleHealth";
import UserInfo from "./pages/UserInfo/UserInfo";
import VetInfo from "./pages/VetInfo/VetInfo";
import CameraSelect from "./pages/Camera/CameraSelect";

function App() {
  let RouterWrap = BrowserRouter;
  if (window.cordova) {
    RouterWrap = HashRouter;
  }
  return (
    <div className="App">
      <RouterWrap>
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
          <Route path="/counselboard/answer/insert" element={<CounselAnswerInsert />} />
          <Route path="/counselboard/answer/update" element={<CounselAnswerUpdate />} />

          {/* PetInfo */}
          <Route path="/petinfo" element={<PetList />} />
          <Route path="/petinfo/insert" element={<PetInsert />} />
          <Route path="/petinfo/detail" element={<PetDetail />} />
          <Route path="/petinfo/update" element={<PetUpdate />} />

          {/* camera */}
          <Route path="/cameraselect" element={<CameraSelect />} />
          <Route path="/ai" element={<Camera />} />
          <Route path="/ai/result" element={<CameraDetail />} />

          {/* chat */}
          <Route path="/chat" element={<Chat />} />
        </Routes>
        <Modal />
        {/* <BeforeInstallPopup /> */}
      </RouterWrap>
    </div>
  );
}

export default App;
