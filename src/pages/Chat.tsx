import { FC, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

// type Message = {
//   room: string;
//   author: string;
//   message: string;
//   time: string;
// };
type ChatProps = {
  socket: Socket;
  username: string;
  room: string;
};

export const Chat: FC<ChatProps> = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState('');
  // const [messageList, setMessageList] = useState<Message[]>([]);

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        room,
        author: username,
        message: currentMessage,
        time: `${new Date(Date.now()).getHours()}:${new Date(
          Date.now()
        ).getMinutes()}`,
      };

      await socket.emit('send_message', messageData);
      setCurrentMessage('');
    }
  };
  useEffect(() => {
    socket.on('receive_message', (data) => {
      console.log('******', data);
      // setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className='chat-window'>
      <div className='joinChatContainer'>
        <input
          type='text'
          value={currentMessage}
          placeholder='Hey...'
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
        />
        <button onClick={sendMessage} type='submit'>
          &#9658;
        </button>
      </div>
    </div>
  );
};
