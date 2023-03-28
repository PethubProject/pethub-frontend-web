import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />

          {/* sign */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

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

          {/* camera */}
          <Route path="/ai" element={<Camera />} />
          <Route path="/ai/result" element={<CameraDetail />} />
        </Routes>
        <Modal />
      </BrowserRouter>
    </div>
  );
}

export default App;