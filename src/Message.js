import React from 'react';
import "./Message.css";
import { Avatar } from '@mui/material';

function Message({timestamp,user,message}) {
  const indianTime = timestamp?.toDate().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  return (
    <div className="message">
        <Avatar src={user.photo}/>
        <div className="message__info">
            <h4>
                {user.displayName}
                <span className="message__timestamp">
                  {/* {new Date(timestamp?.toDate()).toUTCString()} */}
                  {indianTime}

                </span>
            </h4>
            <p>{message}</p>
        </div>
    </div>
  )
}

export default Message