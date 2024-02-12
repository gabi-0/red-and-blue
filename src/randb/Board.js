

function BoardCell({id}) {
	var c_id = "cell_"+ id;
	return (<td id={c_id} className="board_cell">{id}</td>);
}

export default function Board() {
	var boardRows = [0, 3, 6];
	var boardCells = [0, 1, 2];
	return (
	<table>
		{boardRows.map((row) => (
		<tr>{boardCells.map((cell) => ( <BoardCell id={row+cell+1} /> ))}</tr>
		))}
	</table>
	);
}