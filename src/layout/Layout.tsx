import { Box } from '@chakra-ui/react';
import Navigation from './Navigation';
import { LayoutType } from '../config/types';

const Layout: React.FC<LayoutType> = ({ children, onShowMenu, isLoggedIn }) => {
  return (
    <Box w={['100%', '100%', '100%', '600px']} minH="100vh" mx="auto" boxShadow="md">
      {isLoggedIn && <Navigation onShowMenu={onShowMenu} />}
      {children}
    </Box>
  );
};

export default Layout;
