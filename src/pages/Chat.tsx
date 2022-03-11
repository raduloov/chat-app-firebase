import { useEffect, useRef, useState } from 'react';
import { collection, orderBy, query, limit, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../config/firebase-config';

import { Stack, Box, Text, Flex, Icon } from '@chakra-ui/react';
import { FaRegComments } from 'react-icons/fa';
import { MessageType } from '../config/types';
import SendMessage from '../components/SendMessage';
import Message from '../components/Message';
import { useParams } from 'react-router-dom';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<any>([]);
  const [userDisplayName, setUserDisplayName] = useState<string>('');

  const { userId } = useParams();

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getUser = async () => {
      const usersRef = collection(db, 'users');
      onSnapshot(usersRef, snapshot => {
        const allUsers = snapshot.docs.map(doc => doc.data());

        const existingUser = allUsers.find((user: any) => user.uid === userId);

        if (existingUser) {
          setUserDisplayName(existingUser.displayName);
        }
      });
    };

    getUser();
  }, [userId]);

  let chatId: string = '';
  if (auth.currentUser && userId) {
    if (userId === 'groupChat') {
      chatId = 'messages';
    } else if (userId < auth.currentUser.uid) {
      chatId = `${userId}${auth.currentUser.uid}`;
    } else {
      chatId = `${auth.currentUser.uid}${userId}`;
    }
  }

  useEffect(() => {
    const collectionRef = collection(db, chatId);
    const dataOrdered = query(collectionRef, orderBy('createdAt'), limit(100));

    const unsubscribe = onSnapshot(dataOrdered, snapshot => {
      setMessages(snapshot.docs.map(doc => doc.data()));
    });

    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });

    return () => unsubscribe();
  }, [chatId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      <Box w="100%" mt={16} pb={16}>
        <Stack justifyContent="flex-end" minH="100vh" p={3}>
          <Flex
            direction="column"
            justifyContent="center"
            alignItems="center"
            m="auto"
            mb={20}
            textAlign="center"
          >
            <Text fontSize="lg">
              {userDisplayName
                ? `This is the start of your conversation with ${userDisplayName}`
                : 'This is the start of the group chat'}
            </Text>
            <FaRegComments
              size={150}
              color="linear(to-r, pink.500, pink.300, blue.500)"
            />
          </Flex>
          {messages.map((message: MessageType, index: number) => (
            <Message
              key={index}
              text={message.text}
              photoURL={message.photoURL}
              uid={message.uid}
              createdAt={message.createdAt}
            />
          ))}
        </Stack>
        <SendMessage scrollTo={scrollRef} />
      </Box>
      <div ref={scrollRef}></div>
    </>
  );
};

export default Chat;
