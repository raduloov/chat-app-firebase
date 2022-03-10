import { getAuth } from 'firebase/auth';

import {
  HStack,
  Spacer,
  IconButton,
  Heading,
  Image,
  useColorMode
} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';

const Navigation: React.FC<{ onShowMenu: () => void }> = ({ onShowMenu }) => {
  const { colorMode } = useColorMode();

  const auth = getAuth();
  const userImage = auth.currentUser?.photoURL;

  return (
    <HStack
      boxShadow="md"
      p={2}
      w={['100%', '100%', '100%', '600px']}
      bgColor={colorMode === 'light' ? 'white' : 'gray.700'}
      pos="fixed"
      top={0}
    >
      <IconButton
        size="lg"
        icon={<FiMenu />}
        aria-label="Menu"
        isRound={true}
        variant="ghost"
        onClick={onShowMenu}
      />
      <Spacer />
      <Heading bgGradient="linear(to-r, pink.500, pink.300, blue.500)" bgClip="text">
        Chat App
      </Heading>
      <Spacer />
      <Image src={userImage ?? ''} alt="User image" borderRadius="full" h={10} />
    </HStack>
  );
};

export default Navigation;
