import { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseConfig, auth } from './config/firebase-config';

import {
  ChakraProvider,
  theme,
  useDisclosure,
  useMediaQuery
} from '@chakra-ui/react';
import Navigation from './layout/Navigation';
import Login from './components/Login';
import Menu from './components/Menu';
import Channel from './components/Channel';
import Layout from './layout/Layout';

initializeApp(firebaseConfig);

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const [isBigScreen] = useMediaQuery('(min-width: 750px)');

  console.log(isBigScreen);

  onAuthStateChanged(auth, user => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ChakraProvider theme={theme}>
      {!isLoggedIn && <Login />}
      <Menu isOpen={isOpen} onClose={onClose} />

      <Layout onShowMenu={onOpen}>
        <Channel />
      </Layout>
    </ChakraProvider>
  );
};

export default App;
