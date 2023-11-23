import { useState } from 'react';
import * as io from 'socket.io-client';

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
      <div className='bg-grey1 p-10 w-[500px] h-[500px] rounded-3xl flex flex-col justify-between'>
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
          <button onClick={joinRoom}>Join A Room</button>
        </div>

        <div>
          <h1 className='text-white text-center text-2xl'>Start Chat</h1>
        </div>
        <div className='flex'>
          <input placeholder='Message...' className='p-2 rounded-md w-full' />
          <button className='text-white ml-4'> Send</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
