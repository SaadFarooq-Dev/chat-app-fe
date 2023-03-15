import Auth from './components/Auth';
import ChatPage from './components/ChatPage';
import SignUp from './components/SignUp';
import { Route, Routes } from 'react-router-dom';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
 return (
  <>
   <Routes>
    <Route path='/' element={<Auth />} />
    <Route path='/login' element={<Auth />} />
    <Route path='/chat' element={<ChatPage />} />
    <Route path='/signup' element={<SignUp />} />
   </Routes>
  </>
 );
};

export default App;
