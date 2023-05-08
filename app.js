// A tic tac toe game.

function board() {
	let gameBoard = new Array(9);

	const setMove = (index, value) => {
		// index is an array
		gameBoard[index] = value;
	};

	const getMove = index => gameBoard[index];

	const resetBoard = () => {
		gameBoard.forEach(value => (value = undefined));
	};

	const getGameBoard = () => gameBoard;

	return {
		setMove,
		getMove,
		resetBoard,
		getGameBoard,
	};
}
board();

function getWinner() {
	const gameBoard = board.getGameBoard();

	const isWinner = arr => {
		if (arr.every(move => move !== "X") || arr.every(move => move !== "O")) {
			return false;
		}
		return true;
	};

	function checkRow() {

		for (let i = 0; i < 9; i = i + 3) {

			let row = [];
			
      for (let j = i; j < i + 3; j++) {
				row.push(getMove(i));
				if (isWinner(row) === true) return true;
			}

		}
    
		return false;
	}
}

function main() {
	const grid = document.querySelector("#game__grid");
	let noOfMove = 0;

	(function render() {
		const fragment = document.createDocumentFragment();
		for (let i = 1; i <= 9; i++) {
			const gridChildren = document.createElement("div");
			gridChildren.classList.add("game__child");
			gridChildren.classList.add(i);

			fragment.appendChild(gridChildren);
		}
		grid.appendChild(fragment);
	})();

	function registerMove(e) {
		const whichMove = noOfMove => (noOfMove % 2 ? "X" : "O");
		const target = e.target.closest(".game__child");
		console.log(target);
		if (!target.classList.contains("bruh")) {
			target.innerText = whichMove(noOfMove++);
			target.classList.add("bruh");
		}
		// target.addEventListener("transitionend", function () {}, { once: true });
	}

	[...grid.children].forEach(child => {
		child.addEventListener("click", registerMove);
	});
}

main();
