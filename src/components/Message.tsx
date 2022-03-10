import { auth } from '../config/firebase-config';
import { Flex, Image, SlideFade, Text, useColorMode } from '@chakra-ui/react';

const Message: React.FC<{ text: string; photoURL: string; userId: string }> = ({
  text,
  photoURL,
  userId
}) => {
  const { colorMode } = useColorMode();

  const ownMessage = auth.currentUser?.uid === userId;

  let textColor;
  if (ownMessage && colorMode === 'light') {
    textColor = 'white';
  }

  return (
    <Flex
      alignItems="center"
      alignSelf={ownMessage ? 'flex-end' : 'flex-start'}
      zIndex={-1}
    >
      <SlideFade in={true}>
        <Flex direction={!ownMessage ? 'row-reverse' : 'row'} alignItems="center">
          <Text
            fontSize="lg"
            borderWidth={2}
            color={textColor}
            borderColor="#555"
            p={2}
            rounded="xl"
            bgColor={ownMessage ? '#555' : ''}
            mx={1}
          >
            {text}
          </Text>
          <Image src={photoURL} rounded="full" h={10} />
        </Flex>
      </SlideFade>
    </Flex>
  );
};

export default Message;
