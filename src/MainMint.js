import { useState } from "react"
import { ethers, BigNumber } from "ethers"
import RoboNFT from "./Robo.json"
import { Flex, Box, Text, Button, Input } from "@chakra-ui/react"
const contractAddress = "0x271f23823c3cb118dd7688b90f911c7147bcabf5"
const MainMint = ({ accounts, setAccounts }) => {
	const [mintAmount, setMintAmount] = useState(1)
	const isConnected = Boolean(accounts[0])
	const handleMint = async () => {
		if (window.ethereum) {
			const provider = new ethers.providers.Web3Provider(window.ethereum)
			const signer = provider.getSigner()
			const contract = new ethers.Contract(contractAddress, RoboNFT.abi, signer)
			try {
				const response = await contract.mint(BigNumber.from(mintAmount), {
					value: ethers.utils.parseEther((0.01 * mintAmount).toString()),
				})
				console.log(response)
			} catch (error) {
				console.log(error)
			}
		}
	}

	const handleDecrement = () => {
		if (mintAmount <= 1) return
		setMintAmount(mintAmount - 1)
	}
	const handleIncrement = () => {
		if (mintAmount >= 10) return
		setMintAmount(mintAmount + 1)
	}
	return (
		<Flex
			justify={"center"}
			align={"center"}
			height={"100vh"}
			paddingBottom={"150px"}>
			<Box width='520px'>
				<div>
					<Text fontSize={"48px"} textShadow={"0 5px #000"}>
						RoboPunk
					</Text>
					<Text
						fontSize={"24px"}
						letterSpacing={"-5.5%"}
						textShadow={"0 5px #000"}>
						It's 2070. Can the RoboPunk NFT save humans from destructive rampant
						NFT speculation?
					</Text>
				</div>
				{isConnected ? (
					<div>
						<Flex justify={"center"} align={"center"}>
							<Button
								backgroundColor={"#D7517D"}
								borderRadius={"5px"}
								boxShadow={"0 2px 2px 1px #0f0f0f"}
								color={"white"}
								cursor={"pointer"}
								padding={"15px"}
								marginTop={"10px"}
								onClick={handleDecrement}>
								-
							</Button>
							<Input
								readOnly
								width={"100px"}
								height={"40px"}
								textAlign={"center"}
								color={"black"}
								backgroundColor={"white"}
								type='number'
								marginTop={"10px"}
								step={1}
								value={mintAmount}
							/>
							<Button
								backgroundColor={"#D7517D"}
								borderRadius={"5px"}
								boxShadow={"0 2px 2px 1px #0f0f0f"}
								color={"white"}
								cursor={"pointer"}
								padding={"15px"}
								marginTop={"10px"}
								onClick={handleIncrement}>
								+
							</Button>
						</Flex>
						<Button
							backgroundColor={"#D7517D"}
							borderRadius={"5px"}
							boxShadow={"0 2px 2px 1px #0f0f0f"}
							color={"white"}
							cursor={"pointer"}
							padding={"15px"}
							marginTop={"10px"}
							onClick={handleMint}>
							Mint Now
						</Button>
					</div>
				) : (
					<p>You are not connected</p>
				)}
			</Box>
		</Flex>
	)
}
export default MainMint
