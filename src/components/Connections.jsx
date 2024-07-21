import React, { useEffect, useState,useContext } from 'react';
import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
} from "@material-tailwind/react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import '../App.css';

const Connections = () => {
  const [chats, setChats] = useState([]);
  

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        if (doc.exists()) {
          setChats(doc.data() || {});  // Ensure doc.data() is not null or undefined
          console.log(doc.data());
        } else {
          setChats({});  // Set an empty object if the document does not exist
        }
      });
  
      return () => {
        unsub();
      };
    };
  
    currentUser.uid && getChats();
  }, [currentUser.uid]);
  
 

  const handleSelect = (u) => {
    dispatch({type:"CHANGE_USER", payload: u})
  }
  
  return (
    <div className="home connections-container "> {/* Apply appropriate classes */}
      <Card>
        <List className="connections-list"> {/* Apply appropriate classes */}
          {Object.entries(chats)
            .sort(([, a], [, b]) => b.date?.seconds - a.date?.seconds)
            .map(([chatId, chat]) => (
              <ListItem variant="rectangular" key={chatId} onClick={() => handleSelect(chat?.userInfo)}>
                <ListItemPrefix>
                  <Avatar
                    variant="circular"
                    alt={chat?.userInfo?.displayName || 'Fallback Alt Text'}
                    src={chat?.userInfo?.photoURL || 'Fallback Image URL'}
                    className='w-5'
                  />
                </ListItemPrefix>
                <div>
                  <Typography variant="h6" color="blue-gray">
                    {chat?.userInfo?.displayName || 'Fallback User Name'}
                  </Typography>
                </div>
              </ListItem>
            ))}
        </List>
      </Card>
    </div>
  );
  
  
  
};

export default Connections;
