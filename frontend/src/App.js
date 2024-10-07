import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';

function App () {
  let storageToken = null;

  if (localStorage.getItem('token')) {
    storageToken = localStorage.getItem('token');
  }

  const [token, setToken] = React.useState(storageToken);

  const updateToken = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<Login setTokenFunc = {updateToken}/>} /> {/* First screen person will go to is login*/}
          <Route path="/register" element={<Register setTokenFunc = {updateToken}/>} />
          <Route path="/home" element={<Home token = {token} setTokenFunc = {updateToken} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
