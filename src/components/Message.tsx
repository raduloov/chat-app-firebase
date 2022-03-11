import { auth } from '../config/firebase-config';
import { color, Flex, Image, SlideFade, Text, useColorMode } from '@chakra-ui/react';
import { MessageType } from '../config/types';

const Message: React.FC<MessageType> = ({ text, photoURL, uid, createdAt }) => {
  const { colorMode } = useColorMode();

  const ownMessage = auth.currentUser?.uid === uid;

  let textColor;
  if (ownMessage && colorMode === 'light') {
    textColor = 'white';
  }

  let timeColor;
  if (colorMode === 'dark') {
    timeColor = 'rgba(255,255,255,0.6)';
  } else if (colorMode === 'light' && ownMessage) {
    timeColor = 'rgba(255,255,255,0.6)';
  } else {
    timeColor = 'rgba(0,0,0,0.7)';
  }

  const getTime = (date: number) => {
    const dateCreated = new Date(date * 1000);

    const now = new Date().getTime();
    const milisecondsAgo = now - dateCreated.getTime();

    if (milisecondsAgo < 86400000) {
      const hours: string | number = Math.floor(
        (milisecondsAgo / (1000 * 60 * 60)) % 24
      );
      const minutes: string | number = Math.floor(
        (milisecondsAgo / (1000 * 60)) % 60
      );

      if (hours < 1) {
        return minutes < 1 ? 'now' : `${minutes} mins ago`;
      }

      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    }

    let hours: string | number = dateCreated.getHours();
    let minutes: string | number = dateCreated.getMinutes();

    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${minutes}`;
  };

  return (
    <Flex
      maxW="85%"
      alignItems="center"
      alignSelf={ownMessage ? 'flex-end' : 'flex-start'}
    >
      <SlideFade in={true}>
        <Flex direction={!ownMessage ? 'row-reverse' : 'row'} alignItems="center">
          <Flex
            flexDir="column"
            rounded="xl"
            bgColor={ownMessage ? '#555' : ''}
            mx={1}
            borderWidth={2}
            borderColor="#555"
            color={textColor}
            p={2}
          >
            <Text fontSize="lg">{text}</Text>
            <Text
              color={timeColor}
              fontWeight="semibold"
              fontSize="xs"
              alignSelf={ownMessage ? 'flex-end' : 'flex-start'}
            >
              {getTime(createdAt.seconds)}
            </Text>
          </Flex>
          <Image src={photoURL} rounded="full" h={10} />
        </Flex>
      </SlideFade>
    </Flex>
  );
};

export default Message;
