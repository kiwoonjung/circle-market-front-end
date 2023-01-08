import "./Input.scss";
import Img from "../../assets/images/icons/image.svg";
import Attach from "../../assets/images/icons/paperclip.svg";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "@firebase/firestore";
import { v4 as uuid } from "uuid";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export default function Input() {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };
  return (
    <div>
      <div className="chat-input">
        <input
          className="chat-input__input"
          type="text"
          placeholder="Type Something..."
          onChange={(event) => setText(event.target.value)}
          value={text}
        />
        <div className="chat-input__send">
          <label htmlFor="file">
            <img className="chat-input__send--img" src={Img} alt="Img.svg" />
            <input
              className="chat-input__input"
              type="file"
              style={{ display: "none" }}
              id="file"
              onChange={(event) => setImg(event.target.files[0])}
            />
          </label>

          <button onClick={handleSend} className="chat-input__send--btn">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
