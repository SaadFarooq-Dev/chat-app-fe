import React, { useState } from 'react';
import '../styles/MessageInput.css';

const NewMessage = ({socket, user}) => {
  const [value, setValue] = useState(
  { text: '',
    userId: user.id
  }
  );
  const submitForm = (e) => {
    e.preventDefault();
    socket.emit('message', value);
    setValue(
      {
      text: '',
      userId: value.userId
    }
    );
  };

  return (
    <form onSubmit={submitForm}>
      <input
        autoFocus
        type= 'text'
        required
        value={value.text}
        placeholder="Type your message"
        onChange={(e) => {
          setValue({
            text: e.currentTarget.value,
            userId: value.userId
          });
        }}
      />
    </form>
  );
};

export default NewMessage;
