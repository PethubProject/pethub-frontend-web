import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./pages/main/Main";
import BottomModal from "./components/modal/BottomModal";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* main */}
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </BrowserRouter>
      <BottomModal />
    </div>
  );
}

export default App;
