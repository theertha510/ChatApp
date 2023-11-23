import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <main className='h-screen '>
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </main>
  );
}

export default App;
