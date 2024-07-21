import React, { useContext } from 'react';
import { ChatContext } from '../../context/ChatContext';

const UserNameNavbar = () => {

  const { data } = useContext(ChatContext);
  console.log(data);

  return (
    <div>
      <span style={{color:"black"}}>{data?.user?.displayName}</span>
    </div>
  );
};

export default UserNameNavbar;
