import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./pages/main/Main";
import BottomModal from "./components/modal/BottomModal";
import SignUp from "./pages/sign/SignUp";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* main */}
          <Route path="/" element={<Main />} />
          {/* sign */}
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
      <BottomModal />
    </div>
  );
}

export default App;
