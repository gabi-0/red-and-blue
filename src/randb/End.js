import './end.css'
import { useState } from 'react'

function checkWin(state) {
	var i;
	for(i = 0; i < 3; i++) { // check win on lines
		var r = i*3;
		if(state[r] === 0 || state[r] > 2) continue;

		if(state[r] === state[r+1] && state[r] === state[r+2]) return [state[r], 10 + i];
	}

	for(i = 0; i < 3; i++) { // check win on columns
		if(state[i] === 0 || state[i] > 2) continue;

		if(state[i] === state[i+3] && state[i] === state[i+6]) return [state[i], 20 + i];
	}

	// check win on diagonals
	if(state[4] !== 0 && state[4] <= 2) { // middle elemenet should be set
		if(state[0] === state[4] && state[4] === state[8]) return [state[4], 30];
		if(state[2] === state[4] && state[4] === state[6]) return [state[4], 31];
	}

	return [0, 0];
}

export default function End({boardState, fhndl}) {

	var i;
	var st = boardState;
	var state = Array(9);
	for(i = 0; i < 9; i++) {
		state[i] = (st&3);
		st = (st >> 2);
	}

	const [panelState, setPanelState] = useState(1);
	var [winPlayer, winPlace] = checkWin(state);

	var h_msg = "Red - and - blue";
	if(winPlayer) {
		if(panelState !== 11)
			setPanelState(11);
		if(winPlayer === 1)
			h_msg = "Red wins!"+ winPlace;
		else if(winPlayer === 2)
			h_msg = "Blue wins!"+ winPlace;
	}

	var topBtnMsg = ("New\u00A0game");
	var topBtnCls = ("end-btn-blue");
	var leftBtnMsg = ("Rules");
	var leftBtnCls = ("end-btn-red");
	var rightBtnMsg = ("Contact");
	var rightBtnCls = ("end-btn-red");

	if(panelState === 2) {
		topBtnMsg = "Play\u00A0with\u00A0bot";
		topBtnCls = "end-btn-red";
		leftBtnMsg = rightBtnMsg = "-";
		leftBtnCls = rightBtnCls = "end-btn-blue";
	}

	var panel_disp = (panelState === 0 && winPlayer === 0 ? 'none' : 'block' );
	var panel_transp = (panelState < 10 ? 1 : 0.7);

	function topBtnClick() {
		if(panelState === 1)
			setPanelState(2);
		else if(panelState === 2 || panelState === 11) {
			fhndl[0]();
			setPanelState(0);
		}
	}

	return (<div className='end-panel' style={{display: panel_disp }} >
	<div className='end-content'><h1 className='end-msg'>{h_msg}</h1><br />
	<button id="btn-top" className={topBtnCls} onClick={topBtnClick} >{topBtnMsg}</button>
	<button id="btn-left" className={leftBtnCls}>{leftBtnMsg}</button>
	<button id="btn-right" className={rightBtnCls}>{rightBtnMsg}</button>
	</div><div className='end-transparency' style={{opacity: panel_transp}} ></div></div>);
}