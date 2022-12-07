import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import AddItem from "./pages/AddItem/AddItem";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login-page" element={<Login />} />
          <Route path="/add-item" element={<AddItem />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
