import "./Chat.scss";
import Call from "../../assets/images/icons/phone.svg";
import Add from "../../assets/images/icons/user-plus.svg";
import More from "../../assets/images/icons/more-horizontal.svg";
import Messages from "../Messages/Messages";
import Input from "../Input/Input";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

export default function Chat() {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chat__info">
        <span>{data.user?.displayName}</span>
        <div className="chat__icons">
          <img className="chat__icons--img" src={Call} alt="Call" />
          <img className="chat__icons--img" src={Add} alt="Add" />
          <img className="chat__icons--img" src={More} alt="More" />
        </div>
      </div>
      <div className="chat__messages">
        <Messages />
      </div>
      <Input />
    </div>
  );
}
