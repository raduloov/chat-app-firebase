import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';

interface UserProps {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  openChat: (uid: string) => void;
}

export const User: React.FC<UserProps> = ({
  uid,
  displayName,
  email,
  photoURL,
  openChat
}) => {
  return (
    <Flex
      onClick={() => openChat(uid)}
      w="full"
      alignItems="center"
      borderWidth={2}
      rounded="2xl"
      p={2}
      bgColor="rgba(0,0,0,0.15)"
    >
      <Image src={photoURL} rounded="full" h={14} mr={2} />
      <Box overflow="hidden">
        <Text fontSize="lg">{displayName}</Text>
        <Text isTruncated>{email}</Text>
      </Box>
    </Flex>
  );
};
