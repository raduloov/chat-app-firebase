import { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseConfig, auth } from './config/firebase-config';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider, useDisclosure } from '@chakra-ui/react';

import theme from './config/theme';
import Login from './pages/Login';
import Menu from './components/Menu';
import Chat from './pages/Chat';
import Layout from './layout/Layout';
import Home from './pages/Home';

initializeApp(firebaseConfig);

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [notification, setNotification] = useState<boolean | null>(null);

  onAuthStateChanged(auth, user => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const sendNotification = (notification: any) => {
    setNotification(notification);
  };

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Menu isOpen={isOpen} onClose={onClose} />
        <Layout isLoggedIn={isLoggedIn} onShowMenu={onOpen}>
          <Routes>
            <Route
              path="/"
              element={!isLoggedIn ? <Navigate to="/login" /> : <Home />}
            />
            <Route
              path="/login"
              element={isLoggedIn ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/chat/:userId"
              element={
                !isLoggedIn ? (
                  <Navigate to="/login" />
                ) : (
                  <Chat sendNotification={sendNotification} />
                )
              }
            />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
