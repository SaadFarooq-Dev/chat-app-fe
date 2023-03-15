import React, { useEffect, useState } from 'react';
import Messages from './Messages';
import MessageInput from './MessageInput';
import {useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { decodeToken } from "react-jwt";

const ChatPage = () =>{

  const navigate = useNavigate();
  const [user, setUser] = useState(decodeToken(localStorage.getItem('JWT')).user)

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if(!(localStorage.getItem('JWT'))){
      navigate('/login')
    }
    const newSocket = io(`http://${window.location.hostname}:4000`,{
        query: {
          jwt:"asdsadhsahsakdajdsshak"
        }
      });
      setSocket(newSocket);
      return () => newSocket.close();
  }, [setSocket]);

return (
  <>
    <div className="App">
      <header className="app-header">
        React Chat
      </header>
      { socket ? (
        <div className="chat-container" style={{maxHeight:'50vh',overflowY:'scroll'}}>
          <Messages socket={socket} />
          <MessageInput socket={socket} user={user} />
        </div>
      ) : (
        <div>Not Connected</div>
        )}
    </div>
  </>
)
}

export default ChatPage
