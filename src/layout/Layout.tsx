import { Box } from '@chakra-ui/react';
import Navigation from './Navigation';
import { LayoutType } from '../config/types';
import { auth, db } from '../config/firebase-config';
import { addDoc, collection, query, onSnapshot } from 'firebase/firestore';
import { useEffect } from 'react';

const Layout: React.FC<LayoutType> = ({ children, onShowMenu, isLoggedIn }) => {
  // useEffect(() => {
  //   const currentUser = auth.currentUser;

  //   const check = async () => {
  //     const usersRef = collection(db, 'users');
  //     const unsubscribe = onSnapshot(usersRef, snapshot => {
  //       const allUsers = snapshot.docs.map(doc => doc.data());

  //       const existingUser = allUsers.find(
  //         (user: any) => user.uid === currentUser?.uid
  //       );

  //       if (isLoggedIn && !existingUser) {
  //         addUser();
  //       }
  //     });

  //     return unsubscribe;
  //   };

  //   const addUser = async () => {
  //     await addDoc(collection(db, 'users'), {
  //       uid: currentUser?.uid,
  //       displayName: currentUser?.displayName,
  //       photoURL: currentUser?.photoURL
  //     });
  //   };

  //   check();
  //   // return () => check();
  // }, [isLoggedIn]);

  return (
    <Box w={['100%', '100%', '100%', '600px']} minH="100vh" mx="auto" boxShadow="md">
      {isLoggedIn && <Navigation onShowMenu={onShowMenu} />}
      {children}
    </Box>
  );
};

export default Layout;
