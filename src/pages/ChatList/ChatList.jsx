import "./ChatList.scss";
import Chat from "../../components/Chat/Chat";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function ChatList() {
  return (
    <div className="chatlist">
      <div className="chatlist__container">
        <div className="chatlist__sidebar">
          <Sidebar />
        </div>
        <div className="chatlist__chat">
          <Chat />
        </div>
      </div>
    </div>
  );
}
