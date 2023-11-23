import { useState } from 'react';
import * as io from 'socket.io-client';
import { Chat } from './Chat';

const socket = io.connect('http://localhost:3001');

function Home() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');

  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit('join_room', room);
    }
  };

  return (
    <div className='flex items-center'>
      <div className='flex h-[500px] w-[500px] flex-col justify-between rounded-3xl bg-grey1 p-10'>
        <div className='joinChatContainer'>
          <h3>Join A Chat</h3>
          <input
            type='text'
            placeholder='John...'
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type='text'
            placeholder='Room ID...'
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button type='button' onClick={joinRoom}>
            Join A Room
          </button>
        </div>

        <Chat socket={socket} username={username} room={room} />
      </div>
    </div>
  );
}

export default Home;
