
import "./board.css"


function Cell({state, cid, fhndl, player}) {

	var cell_id = cid;
	var c_id = "c_"+ cell_id;

	var st = (state >> (cid*2)) & 3;

	function hndClc() { fhndl[0](cell_id, player); }
	function hndEnt() { fhndl[1](cell_id); }
	function hndLeav() { fhndl[2](cell_id); }

	return (<td key={state} onClick={hndClc} onMouseEnter={hndEnt} onMouseLeave={hndLeav} id={c_id} className="board_cell">
	<img className="piece_triangle" style={{display: st === 1 ? 'block' : 'none'}} src="/img/triangle9.png" alt="RED"></img>
	<img className="piece_square" style={{display: st === 2 ? 'block' : 'none'}} src="/img/square9.png" alt="BLUE"></img></td>);
}

function Row({b_st, rid, fhndl, player}) {
	let cells = [];
	for(var i = 0; i < 3; i++)
		cells.push(<Cell key={i} cid={rid*3 + i} state={b_st} fhndl={fhndl} player={player} />);

	return (<tr>{cells}</tr>)
}

export default function Board({board_st, fhndl, player}) {
	let rows = [];
	for(var i = 0; i < 3; i++)
		rows.push(<Row key={i} rid={i} b_st={board_st} fhndl={fhndl} player={player} />);

	return (<table className="board"><tbody>{rows}</tbody></table>);
}
