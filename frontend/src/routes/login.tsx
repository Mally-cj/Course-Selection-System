import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import {
  Button,
  Center,
  Container,
  FormControl,
  FormErrorMessage,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  useBoolean,
  Box,
  Heading,
  Text,
} from "@chakra-ui/react"
import {
  Link as RouterLink,
  createFileRoute,
  redirect,
} from "@tanstack/react-router"
import React from "react"
import { type SubmitHandler, useForm } from "react-hook-form"

import Logo from "../assets/images/fastapi-logo.svg"
import Background from "../assets/images/background.png"
import type { ApiError } from "../client"
import type { Body_login_login_access_token as AccessToken } from "../client/models/Body_login_login_access_token"
import useAuth, { isLoggedIn } from "../hooks/useAuth"

export const Route = createFileRoute("/login")({
  component: Login,
  beforeLoad: async () => {
    if (isLoggedIn()) {
      throw redirect({
        to: "/",
      })
    }
  },
})

function Login() {
  const [show, setShow] = useBoolean()
  const { login } = useAuth()
  const [error, setError] = React.useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AccessToken>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const onSubmit: SubmitHandler<AccessToken> = async (data) => {
    try {
      await login(data)
    } catch (err) {
      const errDetail = (err as ApiError).body.detail
      setError(errDetail)
    }
  }

  return (
    <>
    <Box
      bgImage={Background} // 确保路径正确
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
      h="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Container
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        maxW="sm"
        p={8}
        boxShadow="lg"
        borderRadius="md"
        backgroundColor="white"
      >
        {/* <Center mb={6}>
          <Image src={Logo} alt="FastAPI logo" height="auto" maxW="2xs" />
        </Center> */}
        <Heading as="h1" size="lg" textAlign="center" mb={4}>
          欢迎使用
        </Heading>
        {/* <Text fontSize="lg" textAlign="center" mb={6} color="blue.600">
          INTELLIGENT COURSE SELECTION SYSTEM
        </Text> */}
        <FormControl id="username" isInvalid={!!errors.username || !!error} mb={4}>
          <Input
            id="username"
            {...register("username", {
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            })}
            placeholder="Email"
            type="email"
          />
          {errors.username && (
            <FormErrorMessage>{errors.username.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl id="password" isInvalid={!!error} mb={4}>
          <InputGroup>
            <Input
              {...register("password")}
              type={show ? "text" : "password"}
              placeholder="Password"
            />
            <InputRightElement
              color="gray.400"
              _hover={{
                cursor: "pointer",
              }}
            >
              <Icon
                onClick={setShow.toggle}
                aria-label={show ? "Hide password" : "Show password"}
              >
                {show ? <ViewOffIcon /> : <ViewIcon />}
              </Icon>
            </InputRightElement>
          </InputGroup>
          {error && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>
        <Center mb={4}>
          <Link as={RouterLink} to="/recover-password" color="blue.500">
            Forgot password?
          </Link>
        </Center>
        <Button variant="solid" colorScheme="blue" type="submit" isLoading={isSubmitting} w="full">
          Log In
        </Button>
      </Container>
    </Box>
    </>
  )
}

