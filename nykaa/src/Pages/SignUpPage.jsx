import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	HStack,
	InputRightElement,
	Stack,
	Button,
	Heading,
	Text,
	useColorModeValue,
	Link,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Contexts/AuthContext";

export default function SignupPage() {
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();
	const [first_name, setFName] = useState("");
	const [last_name, setLName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { isAuth, token, logoutFN, setToken, setAuth } =
		useContext(AuthContext);
	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post(`https://reqres.in/api/register`, {
				first_name,
				last_name,
				email,
				password,
			})
			.then((response) => {
				console.log(response);
				setAuth(true);
				setToken(response.data.token);

				navigate("/");
			})
			.catch((err) => console.log(err));
	};
	return (
		<Flex
			minH={"100vh"}
			align={"center"}
			justify={"center"}
			bg={useColorModeValue("gray.50", "gray.800")}
		>
			<Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
				<Stack align={"center"}>
					<Heading fontSize={"4xl"} textAlign={"center"}>
						Sign up
					</Heading>
					<Text fontSize={"lg"} color={"gray.600"}>
						to enjoy all of our cool features ✌️
					</Text>
				</Stack>
				<Box
					rounded={"lg"}
					bg={useColorModeValue("white", "gray.700")}
					boxShadow={"lg"}
					p={8}
				>
					<Stack spacing={4}>
						<form onSubmit={handleSubmit}>
							<HStack>
								<Box>
									<FormControl id="firstName" isRequired>
										<FormLabel>First Name</FormLabel>
										<Input
											type="text"
											onChange={(e) =>
												setFName(e.target.value)
											}
										/>
									</FormControl>
								</Box>
								<Box>
									<FormControl id="lastName">
										<FormLabel>Last Name</FormLabel>
										<Input
											type="text"
											onChange={(e) =>
												setLName(e.target.value)
											}
										/>
									</FormControl>
								</Box>
							</HStack>
							<FormControl id="email" isRequired>
								<FormLabel>Email address</FormLabel>
								<Input
									type="email"
									onChange={(e) => setEmail(e.target.value)}
								/>
							</FormControl>
							<FormControl id="password" isRequired>
								<FormLabel>Password</FormLabel>
								<InputGroup>
									<Input
										type={
											showPassword ? "text" : "password"
										}
										onChange={(e) =>
											setPassword(e.target.value)
										}
									/>
									<InputRightElement h={"full"}>
										<Button
											variant={"ghost"}
											onClick={() =>
												setShowPassword(
													(showPassword) =>
														!showPassword
												)
											}
										>
											{showPassword ? (
												<ViewIcon />
											) : (
												<ViewOffIcon />
											)}
										</Button>
									</InputRightElement>
								</InputGroup>
							</FormControl>
							<Stack spacing={10} pt={2}>
								<Button
									loadingText="Submitting"
									size="lg"
									bg={"blue.400"}
									color={"white"}
									_hover={{
										bg: "blue.500",
									}}
									type="submit"
								>
									Sign up
								</Button>
							</Stack>
							<Stack pt={6}>
								<Text align={"center"}>
									Already a user?{" "}
									<Link color={"blue.400"}>Login</Link>
								</Text>
							</Stack>
						</form>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
}
