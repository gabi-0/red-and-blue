
import { useState } from 'react'
import Board from './Board'
import End from './End'
import Opponent from './Opponent';
import BoardTop from './BoardTop'


export function getAvaiableSpots(st) {
	var s = st;
	var freeSpots = [];
	for(var i = 0; i < 9; i++) {
		if((s&3) === 0)
			freeSpots.push(i);
		s = (s >> 2);
	}

	return freeSpots;
}

export function playerMoves(state, playerFirst) {
	var sp = getAvaiableSpots(state);
	return (sp.length % 2 === playerFirst);
}


export default function Logic() {
	const [boardState, setBoardState] = useState(16777216);
	const [displayState,setDisplayState] = useState(0);
	const [play, setPlay] = useState(1);
	const [playerFirst, setPlayerFirst] = useState(0);
	const [roomID, setRoomId] = useState(0);

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

	function btnStart() {
		var rNr = parseInt(roomID);
		if(isNaN(rNr) === false)
			setRoomId(rNr + 1);
		setBoardState(0);
		setDisplayState(0);
	}

	function cellClick(id, st) {
		if(getBits(boardState, id)) return;

		var s = changeBits(boardState, id, st);
		setBoardState(s);
		setDisplayState(s);
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

	return (<div className='board-container'>
	<BoardTop boardState={boardState} player={play} playerFirst={playerFirst} />
	<Board boardSt={boardState} dispBoard={displayState}
			fhndl={[cellClick,cellMouseEnter,cellMouseLeave]} player={play} playerFirst={playerFirst} />
	<Opponent boardState={boardState} roomID={roomID} fhndl={[setPlay, setPlayerFirst, cellClick]} />
	<End boardState={boardState} fhndl={[btnStart]} /></div>);
}