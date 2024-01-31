"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useRouter } from "next/router";

import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  IconProps,
  Icon,
} from "@chakra-ui/react";

import React from "react";

const avatars = [
  {
    name: "Ryan Florence",
    url: "https://bit.ly/ryan-florence",
  },
  {
    name: "Segun Adebayo",
    url: "https://bit.ly/sage-adebayo",
  },
  {
    name: "Kent Dodds",
    url: "https://bit.ly/kent-c-dodds",
  },
  {
    name: "Prosper Otemuyiwa",
    url: "https://bit.ly/prosper-baba",
  },
  {
    name: "Christian Nwamba",
    url: "https://bit.ly/code-beast",
  },
];

const Blur = (props) => {
  return (
    <Icon
      width={useBreakpointValue({ base: "100%", md: "40vw", lg: "30vw" })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};

export default function resetPass() {
  const [email, setEmail] = useState("");

  
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
      event.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:5001/auth/resetPassword/${id}`,
        {
          password: password,
        }
      );
      console.log(res);
      if (res.status === 200) {
        console.log("success");
        router.push("/auth/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(router.query)
  }, []);

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Stack
          bg={"gray.50"}
          rounded={"xl"}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: "lg" }}
        >
          <Stack spacing={4}>
            <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
              Enter your email address and we'll send you a link to reset your
              password.
            </Text>
          </Stack>
          <Box as={"form"} onSubmit={handleSubmit} mt={10}>
            <Stack spacing={4}>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
              />

              <Button
                fontFamily={"heading"}
                mt={8}
                type="submit"
                w={"full"}
                bgGradient="linear(to-r, red.400,pink.400)"
                color={"white"}
                _hover={{
                  bgGradient: "linear(to-r, red.400,pink.400)",
                  boxShadow: "xl",
                }}
              >
                Reset Password
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Flex>
      <Blur
        position={"absolute"}
        top={-10}
        left={-10}
        style={{ filter: "blur(70px)" }}
      />
    </Flex>
  );
}