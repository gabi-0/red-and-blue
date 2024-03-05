
import { playerMoves } from "./Logic";



export default function BoardTop({boardState, player, playerFirst}) {

	var pMv = playerMoves(boardState, playerFirst);

	var boardTopMsg = "Wait ";
	var boardTopCls = "board-top-red";
	if(pMv)
		boardTopMsg = "Place ";

	if((pMv && player === 2) || (pMv === false && player === 1)) {
		boardTopCls = "board-top-blue";
	}

	var topDisp = (boardState >= 16777216/2  ? 'none' : 'block');

	return (<h1 className={boardTopCls} style={{display: topDisp}} >{boardTopMsg}</h1>);
}