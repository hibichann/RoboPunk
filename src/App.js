import "./App.css"
import React, { useState } from "react"

import Navbar from "./Navbar"
import MainMint from "./MainMint"
function App() {
	const [accounts, setAccounts] = useState([])
	return (
		<div className='overlay'>
			<div className='bg'></div>
			<div className='App'>
				<Navbar accounts={accounts} setAccounts={setAccounts}></Navbar>
				<MainMint accounts={accounts} setAccounts={setAccounts}></MainMint>
			</div>
		</div>
	)
}

export default App
