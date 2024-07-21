import React, { useEffect, useState, useContext } from 'react';
import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
} from "@material-tailwind/react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

const UserListComponent = () => {
  const [chats, setChats] = useState([]);


  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.exists() ? doc.data() : []);
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);




  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u })
  }

  return (

    <Card>
      <List>
        {Object.entries(chats || {})
          .sort(([, a], [, b]) => b?.date?.seconds - a?.date?.seconds)
          .map(([chatId, chat]) => (
            <ListItem className='hover:bg-cyan-600 hover:text-white' variant="rectangular" key={chatId} onClick={() => handleSelect(chat?.userInfo)}>
              <ListItemPrefix>
                <Avatar
                  variant="circular"
                  alt={chat?.userInfo?.displayName || 'Fallback Alt Text'}
                  src={chat?.userInfo?.photoURL || 'Fallback Image URL'}
                  className="w-10 h-10" // Add this line to set the size of the Avatar image
                />
              </ListItemPrefix>
              <div className='ml-3'>
                <Typography variant="h6">
                  {chat?.userInfo?.displayName || 'Fallback User Name'}
                </Typography>
                <Typography variant="small" color="gray" className="font-normal">
                  {chat?.lastMessage?.text || 'No messages'}
                </Typography>
              </div>
            </ListItem>
          ))}
      </List>
    </Card>


  );



};

export default UserListComponent;
