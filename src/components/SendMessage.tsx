import { FormEvent, useState } from 'react';
import { db, auth } from '../config/firebase-config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

import {
  IconButton,
  Input,
  Flex,
  useToast,
  Container,
  useColorMode,
  Box
} from '@chakra-ui/react';
import { GrSend } from 'react-icons/gr';

const SendMessage = () => {
  const [message, setMessage] = useState<string>('');

  const { colorMode } = useColorMode();

  const toast = useToast();

  const sendMessageHandler = async (event: FormEvent) => {
    event.preventDefault();

    if (message.trim().length === 0) {
      toast({
        title: 'Write something before sending!',
        variant: 'subtle',
        status: 'error',
        duration: 2000,
        isClosable: true,
        containerStyle: {
          marginBottom: '60px'
        }
      });
      return;
    }

    if (auth.currentUser) {
      const { uid, photoURL } = auth.currentUser;

      await addDoc(collection(db, 'messages'), {
        text: message,
        photoURL,
        uid,
        createdAt: serverTimestamp()
      });

      setMessage('');
    }
  };

  return (
    <Box
      p={3}
      pt={0}
      w={['100%', '100%', '100%', '600px']}
      pos="fixed"
      bottom={0}
      bgColor={colorMode === 'dark' ? 'gray.800' : 'white'}
    >
      <Flex as="form" onSubmit={sendMessageHandler}>
        <Input
          size="lg"
          variant="filled"
          placeholder="Message..."
          borderEndRadius={0}
          onChange={event => setMessage(event.target.value)}
          value={message}
        />
        <IconButton
          size="lg"
          icon={<GrSend />}
          aria-label="Send"
          borderStartRadius={0}
          colorScheme="cyan"
          type="submit"
        />
      </Flex>
    </Box>
  );
};

export default SendMessage;
