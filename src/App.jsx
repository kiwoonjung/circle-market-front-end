import "./App.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import AddItem from "./pages/AddItem/AddItem";
import SignUp from "./pages/SignUp/SignUp";
import ItemDetails from "./pages/ItemDetails/ItemDetails";
import EditItem from "./pages/EditItem/EditItem";
import Profile from "./pages/Profile/Profile";
import ChatList from "./pages/ChatList/ChatList";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import PostList from "./pages/PostList/PostList";

function App() {
  const { currentUser } = useContext(AuthContext);
  const ProtectRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/add-item"
            element={
              <ProtectRoute>
                <AddItem />
              </ProtectRoute>
            }
          />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/item-details/:id" element={<ItemDetails />} />
          <Route
            path="/edit-item/:id"
            element={
              <ProtectRoute>
                <EditItem />
              </ProtectRoute>
            }
          />
          <Route
            path="/profile/:id"
            element={
              <ProtectRoute>
                <Profile />
              </ProtectRoute>
            }
          />
          {/* <Route
            path="/edit-profile/:id"
            element={
              <ProtectRoute>
                <EditProfile />
              </ProtectRoute>
            }
          /> */}
          <Route
            path="/chatlist"
            element={
              <ProtectRoute>
                <ChatList />
              </ProtectRoute>
            }
          />
          <Route path="/postlist" element={<PostList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
