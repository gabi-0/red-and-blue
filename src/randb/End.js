

// function checkWin() {
// 	var i;
// 	var state = [];
// 	var st = boardState;
// 	alert(st);
// 	while(st) {
// 		state.push(st & 3);
// 		st = (st >> 2);
// 	}

// 	for(i = 0; i < 3; i++) { // check win on lines
// 		var r = i*3;
// 		if(state[r] === 0) continue;

// 		if(state[r] === state[r+1] && state[r] === state[r+2]) win = 10 + i;
// 	}

// 	for(i = 0; i < 3; i++) { // check win on columns
// 		if(state[i] === 0) continue;

// 		if(state[i] === state[i+3] && state[i] === state[i+6]) win = 20 + i;
// 	}

// 	// check win on diagonals
// 	if(state[4] === 0) win =; // middle elemenet should be set

// 	if(state[0] === state[4] && state[4] === state[8]) win = 20;
// 	if(state[2] === state[4] && state[4] === state[6]) win = 21;

// 	win = 0;
// }

import { useState } from 'react'


export default function End({boardState}) {
	var i, win = 0;
	var st = boardState;
	var state = Array(9);
	for(i = 0; i < 9; i++) {
		state[i] = (st&3);
		st = (st >> 2);
	}

	for(i = 0; i < 3; i++) { // check win on lines
		var r = i*3;
		if(state[r] === 0) continue;

		if(state[r] === state[r+1] && state[r] === state[r+2]) win = 10 + i;
	}

	for(i = 0; i < 3; i++) { // check win on columns
		if(state[i] === 0) continue;

		if(state[i] === state[i+3] && state[i] === state[i+6]) win = 20 + i;
	}

	// check win on diagonals
	if(state[4] !== 0) {// middle elemenet should be set
		if(state[0] === state[4] && state[4] === state[8]) win = 30;
		if(state[2] === state[4] && state[4] === state[6]) win = 31;
	}

	return (<p>{win}</p>);
}