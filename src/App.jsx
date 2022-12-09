import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import AddItem from "./pages/AddItem/AddItem";
import SignUp from "./pages/SignUp/SignUp";
import ItemDetails from "./pages/ItemDetails/ItemDetails";
// import Test from "./pages/Test/Test";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-item" element={<AddItem />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/item-details" element={<ItemDetails />} />
          {/* <Route path="/test" element={<Test />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
