require("@nomicfoundation/hardhat-toolbox")
require("@nomiclabs/hardhat-etherscan")

const dotenv = require("dotenv")

dotenv.config()
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	solidity: "0.8.17",
	networks: {
		goerli: {
			url: process.env.ALCHEMY_APIKEY,
			accounts: [process.env.PRIVATE_KEY],
		},
	},
	etherscan: {
		apiKey: process.env.ETHERSCAN_APIKEY,
	},
}
