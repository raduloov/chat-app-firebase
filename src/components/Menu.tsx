import { FiLogOut } from 'react-icons/fi';

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  VStack
} from '@chakra-ui/react';
import { getAuth, signOut } from 'firebase/auth';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

const Menu: React.FC<{ isOpen: any; onClose: any }> = ({ isOpen, onClose }) => {
  const auth = getAuth();

  const logoutHandler = async () => {
    await signOut(auth);
    onClose();
  };

  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />

        <DrawerHeader>Menu</DrawerHeader>

        <DrawerBody>
          <VStack>
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
        </DrawerBody>

        {/* <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue">Save</Button>
        </DrawerFooter> */}
      </DrawerContent>
    </Drawer>
  );
};

export default Menu;
