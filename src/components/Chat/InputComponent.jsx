import React, { useContext, useState } from "react";
import Attach from "./attach.png";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import EmojiPicker from 'react-emoji-picker';
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../config/firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const InputComponent = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const handleEmojiSelect = (emoji) => {
    setText((prevText) => prevText + emoji);
  };
  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
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
    <div className="input flex items-center justify-between w-full">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
        className="w-5/6 px-4 py-2 mr-0 rounded border border-gray-400 focus:outline-none"
      />
      <div className="emoji">
        <button
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          className="py-2 focus:outline-none"
        >
          😀
        </button>
        {showEmojiPicker && (
          <EmojiPicker
            onEmojiClick={handleEmojiSelect}
            pickerStyle={{ position: 'absolute', bottom: '50px', right: '0' }}
          />
        )}
      </div>
      <label htmlFor="file">
        <img src={Attach} alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
      </label>

      <div className="send ml-0">
        <button
          onClick={handleSend}
          className="px-6 py-2 bg-cyan-800 text-white rounded border border-cyan-800 hover:bg-cyan-600 "
        >
          Send
        </button>
      </div>
    </div>

  );
};

export default InputComponent;