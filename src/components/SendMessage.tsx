import { FormEvent, useState } from 'react';
import { db, auth } from '../config/firebase-config';
import { collection, addDoc, setDoc, doc, Timestamp } from 'firebase/firestore';

import {
  IconButton,
  Input,
  Flex,
  useToast,
  useColorMode,
  Box
} from '@chakra-ui/react';
import { GrSend } from 'react-icons/gr';

interface SendMessageProps {
  scrollTo: any;
  chatId: string;
  userId: string;
}

const SendMessage: React.FC<SendMessageProps> = ({ scrollTo, chatId, userId }) => {
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

    if (auth.currentUser && chatId) {
      const { uid, photoURL } = auth.currentUser;

      try {
        setIsLoading(true);
        await addDoc(collection(db, chatId), {
          text: message,
          photoURL,
          uid,
          to: userId && userId,
          createdAt: Timestamp.fromDate(new Date())
        });

        await setDoc(doc(db, 'lastMessage', chatId), {
          text: message,
          photoURL,
          uid,
          to: userId && userId,
          createdAt: Timestamp.fromDate(new Date()),
          unread: true
        });

        setMessage('');

        scrollTo.current.scrollIntoView({ behavior: 'smooth' });
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        throw error;
      }
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
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setMessage(event.target.value)
          }
          value={message}
        />
        <IconButton
          isLoading={isLoading}
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
