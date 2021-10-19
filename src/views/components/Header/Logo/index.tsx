import { useMemo } from 'react';

import { Box, keyframes } from '@chakra-ui/react';

import { ReactComponent as LogoIcon } from 'assets/logo.svg';

const rotateKeyframes = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

interface Props {
  isVirtualizing: boolean;
}

const Logo = ({ isVirtualizing }: Props): JSX.Element => {
  const animation = isVirtualizing ? `${rotateKeyframes} infinite 0.5s linear` : '';

  const logoStyle = useMemo(() => {
    return isVirtualizing ? { borderRadius: '50%' } : {};
  }, [isVirtualizing]);

  return (
    <Box mr={3}>
      <Box animation={animation}>
        <LogoIcon style={logoStyle} />
      </Box>
    </Box>
  );
};

export default Logo;
