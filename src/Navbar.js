import React from "react"
import { Button, Flex, Image, Link } from "@chakra-ui/react"
import facebook from "./assets/social-media-icons/facebook_32x32.png"
import twitter from "./assets/social-media-icons/twitter_32x32.png"
import email from "./assets/social-media-icons/email_32x32.png"
const Navbar = ({ accounts, setAccounts }) => {
	const isConnected = Boolean(accounts[0])
	const connectAccount = async () => {
		// if (accounts) return
		if (window.ethereum) {
			const accounts = await window.ethereum.request({
				method: "eth_requestAccounts",
			})
			setAccounts(accounts)
		}
	}

	const shorten = (address) =>
		`${address.slice(0, 5)}...${address.slice(address.length - 4)}`
	return (
		<Flex justify={"space-between"} align={"center"} padding={"30px 30px"}>
			<Flex justify={"space-evenly"} direction={"col"} width={"25%"}>
				<Link href='https://www.facebook.com/profile.php?id=100089987271358'>
					<Image src={facebook}></Image>
				</Link>
				<Link href='https://twitter.com/misaka_level0'>
					<Image src={twitter}></Image>
				</Link>
				<Link href='mailto:coder101011@outlook.com'>
					<Image src={email}></Image>
				</Link>
			</Flex>

			<Flex justify={"space-evenly"} direction={"col"} width={"45%"}>
				<Flex justify={"space-between"} direction={"col"} width={"50%"}>
					<div>About</div>
					<div>Mint</div>
					<div>Team</div>
				</Flex>
				<Button
					className='account'
					bgColor={"#D6517D"}
					borderRadius={"5px"}
					padding={"5px"}
					boxShadow={"0 2px 2px 1px #0f0f0f"}
					cursor={"pointer"}
					onClick={connectAccount}>
					{isConnected ? shorten(accounts[0]) : "Connect"}
				</Button>
			</Flex>
		</Flex>
	)
}
export default Navbar
