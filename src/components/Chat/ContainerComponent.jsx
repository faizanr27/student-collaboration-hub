import React, { useEffect, useState, useContext } from 'react';
import UserListComponent from './UserListComponent';
import UserNameNavbar from './UserNameNavbar';
import MessagesComponent from './MessagesComponent';
import UserDetailComponent from './UserDetailComponent';
import { auth, db, storage } from '../../config/firebase';
import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import Attach from "./attach.png";
import {
  arrayUnion,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import InputComponent from './InputComponent';

const ContainerComponent = () => {

  const { currentUser } = useContext(AuthContext);
  const [selectedUser, setSelectedUser] = useState(null);
  const [img, setImg] = useState(null);
  const [text, setText] = useState("");
  const { data } = useContext(ChatContext);
  const [messages, setMessages] = useState([]);

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

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages)
    })
    return () => {
      unsub()
    }
  }, [data.chatId])
  console.log(messages)

  const handleSelect = (user) => {
    setSelectedUser(user);
    console.log('selected user', selectedUser);
  }


  return (
    <div className="home flex w-full bg-gray-100">
      {/* Sidebar */}
      <div className=" w-[20%] h-[calc(97vh-2rem)] mt-2 overflow-y-auto bg-white border-gray-300">
        <div className="p-2 h-5/6 mt-4 ">
          <UserListComponent handleSelect={handleSelect} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 h-[calc(97vh-2rem)] flex flex-col"> {/* Adjusted margin-left */}
        {/* Navbar */}
        <div className="bg-slate-200 p-4  border-b rounded-lg border-gray-300">
          <UserNameNavbar />
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          {messages.map(m => (
            <MessagesComponent message={m} key={m.id} />
          ))}
        </div>

        {/* Input */}
        <div className="bg-slate-200 p-5 mb-3 rounded-xl border-gray-300">
          <InputComponent />
        </div>
      </div>

      {/* User Details */}
      {/* Uncomment the following lines if you want User Details to be displayed */}
      {/* <div className="w-1/4 h-5/6 bg-white border-l border-gray-300">
      <div className="p-0">
        <UserDetailComponent />
      </div>
    </div> */}
    </div>

  );
};

export default ContainerComponent;
