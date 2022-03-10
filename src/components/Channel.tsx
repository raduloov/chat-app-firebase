import { useEffect, useState } from 'react';
import { collection, orderBy, query, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase-config';

import { VStack, Box } from '@chakra-ui/react';
import SendMessage from './SendMessage';
import Message from './Message';

const Channel: React.FC = () => {
  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
    const collectionRef = collection(db, 'messages');
    const dataOrdered = query(collectionRef, orderBy('createdAt'), limit(100));

    onSnapshot(dataOrdered, snapshot => {
      setMessages(snapshot.docs.map(doc => doc.data()));
    });
  }, []);

  return (
    <Box w="100%" mt={16}>
      <VStack justifyContent="flex-end" p={3}>
        {messages.map((message: any, index: number) => (
          <Message
            key={index}
            text={message.text}
            photoURL={message.photoURL}
            userId={message.uid}
          />
        ))}
      </VStack>
      <SendMessage />
    </Box>
  );
};

export default Channel;
