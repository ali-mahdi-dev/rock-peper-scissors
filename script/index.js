
/* Game: Paper/ Rock/ Scisser
---
===== Pseudo Code =====
/*
X: Player 1
Y: Player 2
---
paper = 0;
scissors = 1;
rock = 2;
---
(X vs Y)
x vs y : x = y // tie
s vs p:   1 > 0  // (s win)
r vs s:    2 > 1 // (r win)
r vs p    2 >> 0 // (p win)
*/



// Dictionary
// (rock, paper, scissors) value into text
const rps_text = {
	0: "Paper",
	1: "Scissors",
	2: "Rock"
}


// History used to improve computer intelligence (using an algorithm to predict player movement).
// DON'T CHANGE "history" INITIAL VALUE!
const history = [ {X:0, Y:1}/*{ X:null, Y:null }*/ ]; // for some season computer have a good chance to win with this initial history.


function getComputerSelect() {
	let y;
	let max;

	
	// v0 (random choice - without intelligence)
	// max = 3;
	// y = Math.floor(Math.random() * max); // 0 | 1 | 2 | (or 3 but this will neglect with recursion)
	// if (y === max) getComputerSelect();
	/* 
	Possibilities:
		0 -> 33.3% (0 - 0.9)
		1 -> 33.3% (1 - 1.9)
		2 -> 33.3% (2 - 2.9)
	*/

	
	// v1 (random choice - without intelligence)
	// max = 2;
	// y = Math.round(Math.random() * max); // 0 | 1 | 2
	/*
	Possibilities:
		0 -> 20% (0-0.4)
		1 -> 40% (0.5 - 0.9) & (1 - 1.4)
		2 -> 40% (1.5 - 1.9) & (2 - 2.4)
	*/

	
	// v2 (intelligent select - depends on previous selects(history) of player, using strategy methods)
	max = 2;
	y = Math.round(Math.random() * max); // 0 | 1 | 2
	/*
	Possibilities:
		0 -> 20% (0-0.4)
		1 -> 40% (0.5 - 0.9) & (1 - 1.4)
		2 -> 40% (1.5 - 1.9) & (2 - 2.4)
	*/
	// Most peoples play rock at first turn.
	if (history.length === 0) y = 0;
	// if player lose, select did Not Selected element in the last turn.
	if ((history && history.length !== 0) && getResult(history[history.length - 1]) === "Computer Win") {
		y = [0,1,2].filter((e, index, arr)=>{
			return ((arr[index] !== history[history.length - 1]["X"]) && (arr[index] !== history[history.length - 1]["Y"]));
		});
	}

	
	// v3 (intelligent select - depends on previous selects(history) of player, using strategy methods)
	// y = Coming Soon..

	
	return y;
}




const btns = document.querySelectorAll(".btn");
btns.forEach((btn)=>{
	btn.onclick = function() {
		// Update Selections
		const selects = {
			"X": +btn.value, // player
			"Y": +getComputerSelect() // computer
		}
		// Update History
		history.push(selects);
		// Show Inputs and result on UI
		document.querySelector(".user-select").textContent = rps_text[selects["X"]];
		document.querySelector(".computer-select").textContent = rps_text[selects["Y"]];
		document.querySelector(".result").textContent = getResult(selects);
		// Style Clicked Button
		btns.forEach((e)=>{ e.style.borderColor = "transparent"; });
		btn.style.borderColor = "gold";
	}
});



function getResult({X, Y}) {
	// Fallback
	if(X == null || Y == null) return;
	// Checking result
	if (X === Y) {return "Tie";}
  else if (X === Y + 1) {return "You Win";}
  else if (X === Y + 2) {return "Computer Win";}
  else if (X === Y - 1) {return "Computer Win";}
  else if (X === Y - 2) {return "You Win";}
	/*
	Test:
		x = y -> if0 -> Tie
		0 - 1 -> if3 -> Y win
		0 - 2 -> if4 -> X win
		1 - 0 -> if1 -> X win
		1 - 2 -> if3 -> Y win
		2 - 0 -> if2 -> Y win
		2 - 1 -> if1 -> X win
	*/
}





