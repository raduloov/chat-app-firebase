import { useEffect, useState } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../config/firebase-config';
import { Box, Button, Image, Text } from '@chakra-ui/react';

interface UserProps {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  user1: any;
  openChat: (uid: string) => void;
}

export const User: React.FC<UserProps> = ({
  uid,
  displayName,
  email,
  photoURL,
  user1,
  openChat
}) => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    let chatId: string;
    if (uid === 'groupChat') {
      chatId = 'messages';
    } else if (uid < user1) {
      chatId = `${uid}${user1}`;
    } else {
      chatId = `${user1}${uid}`;
    }

    const unsubscribe = onSnapshot(doc(db, 'lastMessage', chatId), doc => {
      setData(doc.data());
    });

    return () => unsubscribe();
  }, [uid, user1]);

  const showNotification = data && data.uid !== user1 && data.unread;

  return (
    <Button
      onClick={() => openChat(uid)}
      cursor="pointer"
      w="full"
      display="flex"
      justifyContent="flex-start"
      borderWidth={2}
      borderColor={showNotification ? 'green.400' : ''}
      rounded="2xl"
      py={10}
      bgColor={showNotification ? 'rgba(72, 187, 120, 0.15)' : 'rgba(0,0,0,0.15)'}
    >
      <Image src={photoURL} rounded="full" h={14} mr={2} />
      <Box
        overflow="hidden"
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
      >
        <Text fontSize="lg">{displayName}</Text>
        <Text fontSize="sm" isTruncated>
          {email}
        </Text>
        {showNotification && (
          <Text bgColor="green.400" p={1} rounded="lg" mt={1}>
            Unread Messages
          </Text>
        )}
      </Box>
    </Button>
  );
};
