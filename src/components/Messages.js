import React, { useEffect, useState } from 'react';
import ScrollToBottom from './ScrollToBottom';
import '../styles/Messages.css';

function Messages({ socket }) {
  const [messages, setMessages] = useState({});
  useEffect(() => {
    const messageListener = (message) => {
      setMessages((prevMessages) => {
        const newMessages = {...prevMessages};
        newMessages[message._id] = message;
        return newMessages;
      });
    };

    const deleteMessageListener = (messageID) => {
      setMessages((prevMessages) => {
        const newMessages = {...prevMessages};
        delete newMessages[messageID];
        return newMessages;
      });
    };

    socket.on('message', messageListener);
    socket.on('deleteMessage', deleteMessageListener);
    socket.emit('getMessages');

    return () => {
      socket.off('message', messageListener);
      socket.off('deleteMessage', deleteMessageListener);
    };
  }, [socket]);

  return (
    <>
      <div className="message-list">
      {[...Object.values(messages)]
        .map((message) => (
          <div
            key={message._id}
            className="message-container"
            title={`Sent at ${new Date(message.createdAt).toLocaleTimeString()}`}
          >
            <span className="user">{message.userId.username}:</span>
            <span className="message">{message.text}</span>
            <span className="date">{new Date(message.createdAt).toLocaleTimeString()}</span>
          </div>
        ))
      }
      <ScrollToBottom/>
    </div>
    </>

  );
}

export default Messages;
