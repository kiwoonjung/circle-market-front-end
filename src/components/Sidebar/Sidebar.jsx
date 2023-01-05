import "./Sidebar.scss";
import Navbar from "../Navbar/Navbar";
import SearchChat from "../SearchChat/SearchChat";
import Chats from "../Chats/Chats";

export default function Sidebar() {
  return (
    <div>
      <div>
        <Navbar />
        <SearchChat />
        <Chats />
      </div>
    </div>
  );
}
