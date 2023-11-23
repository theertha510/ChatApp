import { useState } from 'react';
import * as io from 'socket.io-client';
import { Chat } from './Chat';

const socket = io.connect('http://localhost:3001');

function Home() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit('join_room', room);
      setShowChat(true);
    }
  };

  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      {!showChat ? (
        <div className='mt-12 flex h-[400px] w-[400px] flex-col justify-center rounded-3xl bg-grey1 p-8'>
          <h3 className='text-center text-2xl text-white'>Join A Chat</h3>
          <input
            className='mt-6 w-full rounded-md p-2'
            type='text'
            placeholder='Name...'
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            className='mt-2 mt-6 w-full rounded-md p-2'
            type='text'
            placeholder='Room ID...'
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button
            type='button'
            className='mx-auto mt-12 rounded bg-violet1 px-12 py-2 text-xl text-white'
            onClick={joinRoom}
          >
            Join A Room
          </button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default Home;
