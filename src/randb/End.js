import './end.css'

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

export default function End({boardState}) {
	var i;
	var st = boardState;
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

	var play_msg = "Replay";

	return (<div className='end-panel' style={{display: (winPlayer === 0 ? 'none' : 'block') }} >
	<div className='end-content'><h1 className='end-msg'>{h_msg}</h1>
	<button>{play_msg}</button>
	</div><div className='end-transparency'></div></div>);
}