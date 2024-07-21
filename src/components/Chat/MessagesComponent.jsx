import React, { useContext, useEffect, useRef } from 'react';
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';

const MessagesComponent = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`flex mb-2 ${message.senderId === currentUser.uid ? 'justify-end' : 'justify-start'
        }`}
    >
      <div
        className={`message ${message.senderId === currentUser.uid ? 'bg-cyan-500' : 'bg-white'
          } p-2 rounded-lg`}
      >
        <div className="flex items-center mb-1">
          <img
            src={
              message.senderId === currentUser.uid
                ? currentUser.photoURL || 'fallback_owner_photo_url'
                : (data.user && data.user.photoURL) || 'fallback_other_photo_url'
            }
            className="flex-none w-8 h-8 rounded-full mr-2"
            alt=""
          />
          {/* <span className="text-sm font-medium">
            {message.senderId === currentUser.uid ? 'You' : data.user.displayName}
          </span> */}

          <div className="flex-1 text-sm">
            <p className='text-gray-900'>{message.text}</p>
            {message.img && <img src={message.img} alt="" className="flex-3 mt-2" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesComponent;
