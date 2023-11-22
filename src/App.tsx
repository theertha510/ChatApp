import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <main className='flex'>
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </main>
  );
}

export default App;
