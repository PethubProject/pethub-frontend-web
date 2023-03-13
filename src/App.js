import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main/Main";
import SignIn from "./pages/Sign/SignIn";
import SignUp from "./pages/Sign/SignUp";
import FreeBoardContent from "./pages/FreeBoard/FreeBoardContent";
import FreeBoardUpdate from "./pages/FreeBoard/FreeBoardUpdate";
import FreeBoardInsert from "./pages/FreeBoard/FreeBoardInsert";
import Camera from "./pages/Camera/Camera23";
import Modal from "./components/Modal/Modal";
import FreeBoardList from "./pages/FreeBoard/FreeBoardList";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />

          {/* sign */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* freeboard */}
          <Route path="/freeboard" element={<FreeBoardList />} />
          <Route path="/freeboard/insert" element={<FreeBoardInsert />} />
          <Route path="/freeboard/update" element={<FreeBoardUpdate />} />
          <Route path="/freeboard/content" element={<FreeBoardContent />} />
        </Routes>
        <Modal />
      </BrowserRouter>
    </div>
  );
}

export default App;
