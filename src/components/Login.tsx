import { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';

import { VStack, Heading, Button, Stack } from '@chakra-ui/react';
import { FaGoogle } from 'react-icons/fa';

const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const auth = getAuth();

  const loginWithGoogleHandler = async () => {
    // if (error !== '') {
    //   setError('');
    // }

    setIsLoading(true);

    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      // return navigate('/profile');
      console.log('success');
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      // setError(error.message);
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
