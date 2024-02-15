import './end.css'
import { useState } from 'react'

function checkWin(state) {
	var i;
	for(i = 0; i < 3; i++) { // check win on lines
		var r = i*3;
		if(state[r] === 0) continue;

		if(state[r] === state[r+1] && state[r] === state[r+2]) return [state[r], 10 + i];
	}

	for(i = 0; i < 3; i++) { // check win on columns
		if(state[i] === 0) continue;

		if(state[i] === state[i+3] && state[i] === state[i+6]) return [state[i], 20 + i];
	}

	// check win on diagonals
	if(state[4] !== 0) { // middle elemenet should be set
		if(state[0] === state[4] && state[4] === state[8]) return [state[4], 30];
		if(state[2] === state[4] && state[4] === state[6]) return [state[4], 31];
	}

	return [0, 0];
}

export default function End({boardState, hideStart, fhndl}) {
	var i;
	var st = boardState;
	var panelState = 1;
	var state = Array(9);
	for(i = 0; i < 9; i++) {
		state[i] = (st&3);
		st = (st >> 2);
	}

	var [winPlayer, winPlace] = checkWin(state);

	var h_msg = "Red - and - blue";
	if(winPlayer === 1)
		h_msg = "Red wins!";
	else if(winPlayer === 2)
		h_msg = "Blue wins!";

	const [topBtnMsg, setTopBtnMsg] = useState("New\u00A0game");
	const [topBtnCls, setTopBtnCls] = useState("end-btn-blue");

	const [leftBtnMsg, setLeftBtnMsg] = useState("Rules");
	const [leftBtnCls, setLeftBtnCls] = useState("end-btn-red");
	const [rightBtnMsg, setRightBtnMsg] = useState("Contact");
	const [rightBtnCls, setRightBtnCls] = useState("end-btn-red");

	var panel_disp = (hideStart === true && winPlayer === 0 ? 'none' : 'block' );
	var panel_transp = (hideStart === false ? 1 : 0.7);


	function topBtnClick() {
		if(panelState === 1) {
			panelState = 2;
			setTopBtnMsg("Play\u00A0with\u00A0bot");
			setTopBtnCls("end-btn-red");
			setLeftBtnMsg('-');
			setRightBtnMsg("-");
			setLeftBtnCls('end-btn-blue')
			setRightBtnCls("end-btn-blue");
		}
		else if(panelState === 2) {
			fhndl[0]();
		}
	}

	return (<div className='end-panel' style={{display: panel_disp }} >
	<div className='end-content'><h1 className='end-msg'>{h_msg}</h1><br />
	<button id="btn-top" className={topBtnCls} onClick={topBtnClick} >{topBtnMsg}</button>
	<button id="btn-left" className={leftBtnCls}>{leftBtnMsg}</button>
	<button id="btn-right" className={rightBtnCls}>{rightBtnMsg}</button>
	</div><div className='end-transparency' style={{opacity: panel_transp}} ></div></div>);
}