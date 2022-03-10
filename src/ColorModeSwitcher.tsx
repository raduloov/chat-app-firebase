import * as React from 'react';
import {
  useColorMode,
  useColorModeValue,
  Button,
  IconButtonProps
} from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

type ColorModeSwitcherProps = Omit<IconButtonProps, 'aria-label'>;

export const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = props => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <Button
      w="100%"
      size="md"
      fontSize="lg"
      variant="outline"
      colorScheme="cyan"
      onClick={toggleColorMode}
      rightIcon={<SwitchIcon />}
      aria-label={`Switch to ${text} mode`}
      {...props}
    >
      Switch to {text} mode
    </Button>
  );
};
