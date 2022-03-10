import { Box } from '@chakra-ui/react';
import Navigation from './Navigation';

const Layout: React.FC<{ onShowMenu: () => void }> = ({ children, onShowMenu }) => {
  return (
    <Box w={['100%', '100%', '100%', '600px']} h="100vh" mx="auto" shadow="md">
      <Navigation onShowMenu={onShowMenu} />
      {children}
    </Box>
  );
};

export default Layout;
