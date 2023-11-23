function Home() {
  return (
    <div className='flex items-center'>
      <div className='bg-grey1 p-10 w-[500px] h-[500px] rounded-3xl flex flex-col justify-between'>
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
