import { useEffect, useState } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  VStack,
  Heading
} from '@chakra-ui/react';
import { db, auth } from '../config/firebase-config';
import { getAuth, signOut } from 'firebase/auth';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { FiLogOut, FiUsers } from 'react-icons/fi';
import { User } from './User';

const Menu: React.FC<{ isOpen: any; onClose: any }> = ({ isOpen, onClose }) => {
  const [users, setUsers] = useState<any>([]);

  const auth = getAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const usersRef = collection(db, 'users');

    if (auth.currentUser) {
      const q = query(usersRef, where('uid', '!=', auth.currentUser?.uid));
      const unsubscribe = onSnapshot(q, querySnapshot => {
        let users: any = [];
        querySnapshot.forEach(doc => {
          users.push(doc.data());
        });
        setUsers(users);
      });

      return () => unsubscribe();
    }
  }, [auth.currentUser]);

  const logoutHandler = async () => {
    await signOut(auth);
    onClose();
    return navigate('/login');
  };

  const redirect = (uid: string) => {
    onClose();
    return navigate(`/chat/${uid}`);
  };

  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />

        <DrawerHeader shadow="md">Menu</DrawerHeader>

        <DrawerBody>
          <VStack>
            <Heading>Users</Heading>
            <User
              uid="groupChat"
              displayName="Group Chat"
              email=""
              photoURL="data:image/png;base64,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"
              openChat={redirect}
            />
            {users.map((user: any) => (
              <User
                uid={user.uid}
                displayName={user.displayName}
                email={user.email}
                photoURL={user.photoURL}
                openChat={redirect}
                key={user.uid}
              />
            ))}
          </VStack>
        </DrawerBody>

        <DrawerFooter>
          <VStack w="100%">
            <ColorModeSwitcher />
            <Button
              onClick={logoutHandler}
              variant="outline"
              colorScheme="cyan"
              w="100%"
              fontSize="lg"
              rightIcon={<FiLogOut />}
            >
              Logout
            </Button>
          </VStack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Menu;
