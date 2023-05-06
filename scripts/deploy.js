const hre = require("hardhat")

async function main() {
	const RoboPunkNFT = await hre.ethers.getContractFactory("RoboPunkNFT")
	const roboPunkNFT = await RoboPunkNFT.deploy()

	await roboPunkNFT.deployed()

	console.log(roboPunkNFT.address)
}

main().catch((error) => {
	console.error(error)
	process.exitCode = 1
})
//0x2Ce515cD5de55099709345DE5E1973E657Cba413
