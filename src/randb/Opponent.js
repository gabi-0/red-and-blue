import { useEffect, useRef } from "react";
import { getAvaiableSpots, playerMoves } from './Logic'


export default function Opponent({boardState, fhndl}) {

	var setPlayer = fhndl[0];
	var setPlayerFirst = fhndl[1];
	var cellClick = fhndl[2];
	const player = useRef(0);
	const oppon = useRef(0);
	const playerFirst = useRef(0);
	const oldBoardSt = useRef(0);

	useEffect(() => {
		if(boardState === oldBoardSt.current) return;
		oldBoardSt.current = boardState;

		if(boardState === 0) {
			player.current = Math.floor(Math.random() * 2);
			oppon.current = (1 - player.current) + 1;
			setPlayer(player.current + 1);

			playerFirst.current = Math.floor(Math.random() * 2);
			setPlayerFirst(playerFirst.current);
			console.log("new game: "+ player.current +"; playerFirst: "+ playerFirst.current);
		}
		if(boardState >= 16777216 / 2) return;

		var spots = getAvaiableSpots(boardState);
		if(playerMoves(boardState, playerFirst.current) === false) {
			setTimeout(() => {
				var indx = Math.floor(Math.random() * spots.length);
				var place = spots[indx];
				cellClick(place, oppon.current);
				console.log("opponent moved @ "+ place);
			}, 1000);
		}

	}, [boardState, setPlayer, setPlayerFirst, cellClick]);
	return (<></>);
}