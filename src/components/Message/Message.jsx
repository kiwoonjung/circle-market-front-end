import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { db } from "../../firebase";
import "./Message.scss";

export default function Message(message) {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();
  // console.log(message.message.img);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${
        message.message.senderId === currentUser.uid && "owner"
      }`}
    >
      <div className="message__info">
        <img
          className="message__info--img"
          src={
            message.message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span className="message__info--time">time ago</span>
      </div>
      <div className="message__content">
        <p className="message__content--text">{message.message.text}</p>

        {message.message.img && (
          <img
            className="message__content--img"
            src={message.message.img}
            alt=""
          />
        )}
      </div>
    </div>
  );
}
