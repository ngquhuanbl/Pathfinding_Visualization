import { Stack, Spacer } from '@chakra-ui/react';

import FooterControls, { Props as FooterControlsProps } from './FooterControls';
import Legends from './Legends';

const Footer = (props: FooterControlsProps): JSX.Element => {
  return (
    <Stack
      w="full"
      direction={['column', 'column', 'column', 'column', 'row']}
      alignItems={['center', 'center', 'center', 'center', 'flex-start']}
    >
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <FooterControls {...props} />
      <Spacer paddingLeft={8} paddingRight={8} />
      <Legends />
    </Stack>
  );
};

export default Footer;
