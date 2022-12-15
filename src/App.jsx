import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import AddItem from "./pages/AddItem/AddItem";
import SignUp from "./pages/SignUp/SignUp";
import ItemDetails from "./pages/ItemDetails/ItemDetails";
import EditItem from "./pages/EditItem/EditItem";
import Profile from "./pages/Profile/Profile";
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
          <Route path="/item-details/:id" element={<ItemDetails />} />
          <Route path="/edit-item/:id" element={<EditItem />} />
          <Route path="/profile/:id" element={<Profile />} />
          {/* <Route path="/test" element={<Test />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
