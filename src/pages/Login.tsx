import { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { db } from '../config/firebase-config';
import { doc, setDoc, onSnapshot, addDoc, collection } from 'firebase/firestore';

import { VStack, Heading, Button, Stack } from '@chakra-ui/react';
import { FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const auth = getAuth();

  const navigate = useNavigate();

  const loginWithGoogleHandler = async () => {
    // if (error !== '') {
    //   setError('');
    // }

    setIsLoading(true);

    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      setIsLoading(false);

      const currentUser = auth.currentUser;

      const check = async () => {
        const usersRef = collection(db, 'users');
        onSnapshot(usersRef, snapshot => {
          const allUsers = snapshot.docs.map(doc => doc.data());

          const existingUser = allUsers.find(
            (user: any) => user.uid === currentUser?.uid
          );

          if (!existingUser) {
            addUser();
          }
        });
      };

      check();

      const addUser = async () => {
        await addDoc(collection(db, 'users'), {
          uid: currentUser?.uid,
          displayName: currentUser?.displayName,
          email: currentUser?.email,
          photoURL: currentUser?.photoURL
        });
      };

      return navigate('/');
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  return (
    <VStack textAlign="center" justifyContent="center" alignItems="center" h="100vh">
      <Stack mb={20}>
        <Heading>Welcome to</Heading>
        <Heading
          size="3xl"
          bgGradient="linear(to-r, pink.500, pink.300, blue.500)"
          bgClip="text"
        >
          Chat App
        </Heading>
      </Stack>
      <Button
        onClick={loginWithGoogleHandler}
        isLoading={isLoading}
        loadingText="Logging in..."
        variant="outline"
        rightIcon={<FaGoogle />}
        size="lg"
      >
        Log in with Google
      </Button>
    </VStack>
  );
};

export default Login;
