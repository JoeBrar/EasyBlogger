import logo from './logo.svg';
import './App.css';
import Post from './components/Post';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TestPage from './pages/TestPage';
import CreatePost from './pages/CreatePost';
import {UserContextProvider} from './context/UserContext';
import PostPage from './pages/PostPage';
import Newfile from './pages/Newfile';
import EditPost from './pages/EditPost';

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route index element={
          <Homepage />
        } />
        <Route path="/login" element={
          <LoginPage />
        }/>
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/test" element={<TestPage/>} />
        <Route path="/create" element={<CreatePost/>} />
        <Route path="/post/:id" element={<PostPage/>} />
        <Route path="/newfile" element={<Newfile/>} />
        <Route path="/edit/:postId" element={<EditPost/>} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
