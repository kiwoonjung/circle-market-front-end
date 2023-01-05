import "../SearchChat/SearchChat.scss";
import { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDoc,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";

export default function SearchChat() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (event) => {
    event.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chat
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername("");
  };

  return (
    <div className="search-chat">
      <div className="search-chat__form">
        <input
          className="search-chat__form--input"
          type="text"
          placeholder="Find a User"
          onKeyDown={handleKey}
          onChange={(event) => setUsername(event.target.value)}
          value={username}
        />
      </div>
      {err && <span>User not found</span>}
      {user && (
        <div className="search-chat__user-chat" onClick={handleSelect}>
          <img
            className="search-chat__user-chat--img"
            src={user.photoURL}
            alt=""
          />
          <div className="search-chat__user-chat--info">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
}
