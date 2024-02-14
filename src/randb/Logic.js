
import { useState } from 'react'
import Board from './Board'
import End from './End'


export default function Logic() {
	// var arr = [[0,1,2], [2,1,0], [1,1,1]];
	// var state = [[0,0,0], [0,0,0], [0,0,0]];
	const [boardState, setBoardState] = useState(0);
	const [displayState,setDisplayState] = useState(0);
	const [play, setPlay] = useState(1);

	// setPlay(1);

	function changeBits(seed, id, state) {
		var neg = ~(3 << (id*2));
		var erased = seed & neg;
		var fin = (erased | (state << (id*2)));
		return fin;
	}

	function getBits(state, id) {
		var s = ((state >> (id*2)) & 3);
		return s;
	}

	function cellClick(id, st) {
		if(getBits(boardState, id)) return;

		var s = changeBits(boardState, id, st);
		setBoardState(s);
	}

	function cellMouseEnter(id) {
		if(getBits(boardState, id)) return;

		var s = changeBits(boardState, id, play);
		setDisplayState(s);
	}
	function cellMouseLeave(id) {
		if(getBits(boardState, id)) return;

		var s = changeBits(boardState, id, 0);
		setDisplayState(s);
	}

	return (<><Board board_st={displayState} fhndl={[cellClick,cellMouseEnter,cellMouseLeave]} player={play} />
	<End boardState={boardState}/></>);
}