import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main/Main";
import SignIn from "./pages/Sign/SignIn";
import SignUp from "./pages/Sign/SignUp";
import SignOut from "./pages/Sign/SignOut";
import FreeBoardList from "./pages/FreeBoard/FreeBoardList";
import FreeBoardContent from "./pages/FreeBoard/FreeBoardContent";
import FreeBoardUpdate from "./pages/FreeBoard/FreeBoardUpdate";
import FreeBoardInsert from "./pages/FreeBoard/FreeBoardInsert";
import Camera from "./pages/Camera/Camera23";
import CameraDetail from "./pages/Camera/CameraDetail";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />

          {/* board */}
          <Route path="/freeboard" element={<FreeBoardList />}></Route>
          <Route
            path="/freeboard/content"
            element={<FreeBoardContent />}
          ></Route>
          <Route path="/freeboard/insert" element={<FreeBoardInsert />}></Route>
          <Route path="/freeboard/update" element={<FreeBoardUpdate />}></Route>

          {/* sign */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signout" element={<SignOut />} />

          {/* camera */}
          <Route path="/camera" element={<Camera />} />
          <Route path="/camera/detail" element={<CameraDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
