import { FC, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import ScrollToBottom from 'react-scroll-to-bottom';

type Message = {
  id: string;
  room: string;
  author: string;
  message: string;
  time: string;
};
type ChatProps = {
  socket: Socket;
  username: string;
  room: string;
};

export const Chat: FC<ChatProps> = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState<Message[]>([]);

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
      setMessageList((list: Message[]) => [...list, messageData] as Message[]);
      setCurrentMessage('');
    }
  };

  const handleReceiveMessage = (data: Message) => {
    setMessageList((list) => [...list, data]);
  };

  useEffect(() => {
    socket.on('receive_message', handleReceiveMessage);
    return () => {
      // Cleanup: remove the event listener when the component unmounts
      socket.off('receive_message', handleReceiveMessage);
    };
  }, [socket]);

  return (
    <div className='mt-8 flex h-[500px] w-[500px] flex-col justify-between rounded-3xl  bg-grey1 pb-10'>
      <h1 className='rounded-t-3xl bg-black py-5 text-center text-xl font-bold text-white'>
        Live Chat
      </h1>
      <ScrollToBottom className='h-[330px] w-full'>
        {messageList?.map((messageContent: Message) => {
          return (
            <div
              className='message mx-2'
              id={username === messageContent.author ? 'you' : 'other'}
              key={messageContent?.id}
            >
              <div>
                <div className='message-content'>
                  <p>{messageContent.message}</p>
                </div>
                <div className='mt-2 text-right text-xs text-white opacity-50'>
                  <p id='time'>{messageContent.time}</p>
                  <p id='author'>{messageContent.author}</p>
                </div>
              </div>
            </div>
          );
        })}
      </ScrollToBottom>
      <div className='flex p-10'>
        <input
          type='text'
          value={currentMessage}
          placeholder='Hey...'
          className='w-full rounded-md p-2'
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              sendMessage();
            }
          }}
        />
        <button onClick={sendMessage} type='submit' className='ml-4 text-white'>
          Send
        </button>
      </div>
    </div>
  );
};
