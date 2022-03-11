import { Flex, Text } from '@chakra-ui/react';

const Home = () => {
  return (
    <Flex direction="column" h="100vh" justifyContent="center" alignItems="center">
      <Text fontSize="6xl">👋</Text>
      <Text fontSize="xl" mb={5}>
        Hey there! Welcome on board!
      </Text>
      <Text>Start by heading to the menu at the</Text>
      <Text>top left corner and selecting a user or a group</Text>
      <Text>to start a conversation with!</Text>
    </Flex>
  );
};

export default Home;
