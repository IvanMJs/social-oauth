import React, { useEffect, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  Button,
  Flex,
  useColorMode,
  useColorModeValue,
  Text,
  Img,
  Heading,
  Link,
  Container,
  HTMLChakraProps,
  chakra,
} from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { HTMLMotionProps, motion } from "framer-motion";
type UserMetadata = {
  avatar_url: string;
  full_name: string;
  user_name: string;
};
type Merge<P, T> = Omit<P, keyof T> & T;

type MotionBoxProps = Merge<HTMLChakraProps<"div">, HTMLMotionProps<"div">>;

export const MotionBox: React.FC<MotionBoxProps> = motion(chakra.div);
export default function App() {
  const supabaseClient = useRef<any>();
  const [user, setUser] = useState<UserMetadata | undefined>();
  const formBackground = useColorModeValue("gray.700", "gray.700");
  const logIn = useColorModeValue("blue.300", "gray.200");
  const { toggleColorMode } = useColorMode();

  useEffect(() => {
    if (
      process.env.REACT_APP_SUPABASE_URL &&
      process.env.REACT_APP_SUPABASE_ANON_KEY
    ) {
      supabaseClient.current = createClient(
        process.env.REACT_APP_SUPABASE_URL,
        process.env.REACT_APP_SUPABASE_ANON_KEY
      );
    }
    const getUser = async () => {
      const supabaseUser = supabaseClient.current.auth.user();
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      supabaseUser ? setUser(supabaseUser.user_metadata) : null;
    };
    getUser();
  }, []);

  const loginWithGithub = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await supabaseClient.current.auth.signIn({
      provider: "github",
    });
  };
  const logout = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { error } = await supabaseClient.current.auth.signOut();
    if (error) {
      console.log(error);
      return;
    }
    setUser(undefined);
  };
  return user ? (
    <>
      <Flex alignItems="center" justify="center" margin="auto" mt={5}>
        <Text textAlign="center" fontSize="5xl" mb={6} mt={10}>
          Connected with Supabase
        </Text>
      </Flex>
      <Flex alignItems="center" justify="center" margin="auto">
        <Text>
          React-Typescript and connected with{" "}
          <Link color="blue.200" href="https://supabase.io/" isExternal>
            Supabase <ExternalLinkIcon mx="2px" />
          </Link>
        </Text>
      </Flex>
      <Flex height="100vh" alignItems="center" justify="center" margin="auto">
        <Flex alignItems="center" justify="center" direction="column">
          <Img rounded={10} src={user.avatar_url} alt="User Avatar" />
          <Text align="center" fontSize="2xl" mb={6}>
            <b>Full Name:</b> {user.full_name}
          </Text>
          <Text align="center" fontSize="2xl" mb={6}>
            <b>User Name:</b> {user.user_name}
          </Text>
          <Flex
            direction="column"
            background={formBackground}
            p={12}
            rounded={10}
          >
            <Button mb={3} onClick={logout}>
              Logout
            </Button>
            <Button
              as="button"
              p={4}
              color="white"
              fontWeight="bold"
              borderRadius="md"
              bgGradient="linear(to-r, teal.500,green.500)"
              _hover={{
                bgGradient: "linear(to-r, red.500, yellow.500)",
              }}
              onClick={toggleColorMode}
            >
              Color Mode
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  ) : (
    <>
      <Flex alignItems="center" justify="center" margin="auto">
        <Text textAlign="center" fontSize="5xl" mb={6} mt={10}>
          Connected with Supabase
        </Text>
      </Flex>
      <Flex alignItems="center" justify="center" margin="auto">
        <Text textAlign="center">
          React-Typescript and connected with{" "}
          <Link color="blue.200" href="https://supabase.io/" isExternal>
            Supabase <ExternalLinkIcon mx="2px" />
          </Link>
        </Text>
      </Flex>
      <Flex height="50vh" alignItems="center" justify="center" margin="auto">
        <Flex
          direction="column"
          background={formBackground}
          p={12}
          rounded={10}
        >
          <Heading color={logIn} align="center" mb={6}>
            Log In
          </Heading>
          <Button
            mb={3}
            colorScheme="teal"
            leftIcon={<FaGithub />}
            align="center"
            onClick={loginWithGithub}
          >
            Login with Github
          </Button>
          <Button
            as="button"
            p={4}
            color="white"
            fontWeight="bold"
            borderRadius="md"
            bgGradient="linear(to-r, teal.500,green.500)"
            _hover={{
              bgGradient: "linear(to-r, red.500, yellow.500)",
            }}
            onClick={toggleColorMode}
          >
            Color Mode
          </Button>
        </Flex>
      </Flex>
      <Flex>
        <Container d="flex" alignItems="center" justifyContent="center">
          <MotionBox
            as="aside"
            animate={{
              scale: [1, 2, 2, 1, 1],
              rotate: [0, 0, 270, 270, 0],
              borderRadius: ["20%", "20%", "50%", "50%", "20%"],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              times: [0, 0.2, 0.5, 0.8, 1],
              repeat: Infinity,
              repeatType: "loop",
              repeatDelay: 1,
            }}
            padding="2"
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            width="12"
            height="12"
            display="flex"
          />
        </Container>
      </Flex>
    </>
  );
}
