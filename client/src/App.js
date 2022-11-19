import logo from './logo.svg';
import './App.css';
import './Table.css';
import DashboardPage from './Pages/DashboardPage';
import { Route, Routes } from 'react-router-dom';
import AddData from './Pages/AddData';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<DashboardPage />} />
        <Route path='/add' element={<AddData/>} />
      </Routes>
    </>
  );
}

export default App;
