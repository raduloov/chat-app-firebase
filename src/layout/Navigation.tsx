import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../config/firebase-config';

import {
  HStack,
  Spacer,
  IconButton,
  Heading,
  Image,
  useColorMode
} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import { MdNotificationsActive } from 'react-icons/md';

const Navigation: React.FC<{
  onShowMenu: () => void;
}> = ({ onShowMenu }) => {
  const [data, setData] = useState<any>();

  const { colorMode } = useColorMode();

  const userImage = auth.currentUser?.photoURL;

  let showNotification = false;
  useEffect(() => {
    const collectionRef = collection(db, 'lastMessage');

    const unsubscribe = onSnapshot(collectionRef, snapshot => {
      setData(snapshot.docs.map(doc => doc.data()));
    });

    return () => unsubscribe();
  }, []);

  if (data) {
    showNotification = data.some(
      (msg: any) => msg.unread && msg.to === auth.currentUser?.uid
    );
  }

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
        icon={showNotification ? <MdNotificationsActive /> : <FiMenu />}
        aria-label="Menu"
        isRound={true}
        variant="ghost"
        bgColor={showNotification ? 'green.500' : ''}
        onClick={onShowMenu}
      >
        {showNotification ? <MdNotificationsActive /> : undefined}
      </IconButton>

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
