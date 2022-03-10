import { useEffect, useRef, useState } from 'react';
import { collection, orderBy, query, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase-config';

import { Stack, VStack, Box } from '@chakra-ui/react';
import SendMessage from './SendMessage';
import Message from './Message';

const Channel: React.FC = () => {
  const [messages, setMessages] = useState<any>([]);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const collectionRef = collection(db, 'messages');
    const dataOrdered = query(collectionRef, orderBy('createdAt'), limit(100));

    onSnapshot(dataOrdered, snapshot => {
      setMessages(snapshot.docs.map(doc => doc.data()));
    });

    // if (messages.length > 0) {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    // }
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      <Box w="100%" mt={16} pb={16}>
        <Stack justifyContent="flex-end" minH="100vh" p={3}>
          {messages.map((message: any, index: number) => (
            <Message
              key={index}
              text={message.text}
              photoURL={message.photoURL}
              userId={message.uid}
            />
          ))}
        </Stack>
        <SendMessage scrollTo={scrollRef} />
      </Box>
      <div ref={scrollRef}></div>
    </>
  );
};

export default Channel;
