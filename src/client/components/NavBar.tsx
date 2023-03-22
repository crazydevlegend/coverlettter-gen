import {
  HStack,
  Heading,
  Button,
  Link,
  Spacer,
  MenuButton,
  MenuList,
  MenuItem,
  Menu,
  Text,
  StackProps,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { MdWorkOutline } from 'react-icons/md';
import { AiOutlineMenu } from 'react-icons/ai';
import useAuth from '@wasp/auth/useAuth';
import { useRef } from 'react';

export default function NavBar() {
  const { data: user } = useAuth();

  return (
    <HStack
      as='nav'
      align='center'
      justify='center'
      px={7}
      py={4}
      top={0}
      width='100%'
      position='sticky'
      bg='rgba(0, 0, 0, 0.5)'
      backdropFilter='blur(5px)'
      borderBottom='sm'
      borderColor='border-contrast-sm'
      filter='drop-shadow(0px 0px 2px rgba(255, 255, 255, 0.25))'
      color='white'
      zIndex={99}
    >
      <HStack width={['md', 'lg', 'xl']} px={1} align='center' justify='space-between'>
        <Heading size='md'>
          <Link as={RouterLink} to='/'>
            CoverLetterGPT
          </Link>
        </Heading>
        <Spacer />
        {user ? (
          <>
            <NavButton icon={<MdWorkOutline />} to='/jobs'>
              Jobs Dashboard
            </NavButton>
            <Spacer maxW='3px' />
            <NavButton icon={<CgProfile />} to='/profile'>
              Profile
            </NavButton>
            <MobileButton icon={<AiOutlineMenu />} isUser={true}>
              Menu
            </MobileButton>
          </>
        ) : (
          <>
            <NavButton icon={<CgProfile />} to='/login'>
              Login
            </NavButton>
            <MobileButton icon={<AiOutlineMenu />} isUser={false}>
              Menu
            </MobileButton>
          </>
        )}
      </HStack>
    </HStack>
  );
}

interface NavButtonProps extends StackProps {
  children: React.ReactNode;
  icon: React.ReactElement;
  to: string;
  props?: StackProps;
}

function NavButton({ children, icon, to, ...props }: NavButtonProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  function removeFocus() {
    if (linkRef.current) {
      linkRef.current.blur();
    }
  }

  return (
    <Link as={RouterLink} to={to} display={['none', 'block']} ref={linkRef} onClick={removeFocus}>
      <HStack {...props}>
        {icon}
        <Text>{children}</Text>
      </HStack>
    </Link>
  );
}

function MobileButton({
  children,
  icon,
  isUser,
}: {
  children: React.ReactNode;
  icon: React.ReactElement;
  isUser?: boolean;
}) {
  return (
    <Menu>
      <MenuButton
        as={Button}
        aria-label={children as string}
        leftIcon={icon}
        display={['block', 'none']}
        size='md'
        border='md'
        _hover={{
          border: 'md',
          borderColor: 'rgba(255, 250, 240, 0.55)',
          transition: 'all 0.3s ease-in-out',
        }}
      >
        {children}
      </MenuButton>
      <MenuList bgColor='gray.900'>
        {isUser ? (
          <>
            <Link as={RouterLink} to={`/jobs`}>
              <MenuItem>Jobs Dashboard</MenuItem>
            </Link>
            <Link as={RouterLink} to={`/profile`}>
              <MenuItem>Profile</MenuItem>
            </Link>
          </>
        ) : (
          <>
            <Link as={RouterLink} to='/login'>
              <MenuItem>Login</MenuItem> 
            </Link>
          </>
        )}
      </MenuList>
    </Menu>
  );
}
