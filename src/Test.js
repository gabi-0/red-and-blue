

import { useState } from 'react'

function Comp({state, fhndl}) {

	return (<div><p style={{color: state === true ? 'red' : 'green', fontSize: 32}} onMouseEnter={fhndl[1]} onMouseLeave={fhndl[2]} >changing</p>
		<p onClick={fhndl[0]}>CLICK THIS</p></div>);
}


function Aux2({state, clkEv}) {
	return (<Comp state={state} fhndl={clkEv}></Comp>);
}

function Aux1({state, clkEv}) {
	return (<Aux2 state={state} clkEv={clkEv}></Aux2>);
}

export default function Test() {
	const [board, setBoard] = useState(false);

	function handleClk() {
		alert("hello");
	}
	
	function handleMEnter() {
		setBoard(true);
	}
	function handleMLeave() {
		setBoard(false);
	}

	return (<Aux1 state={board} clkEv={[handleClk, handleMEnter, handleMLeave]}></Aux1>);
}