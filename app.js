// A tic tac toe game.
const grid = document.querySelector("#game__grid");
const gameBoard = board();

// RELEVANT TO QUESTION

function board() {
	let gameBoard = [[], [], []];

	const setMove = (i, j, value) => {
		// index is an array
		gameBoard[i][j] = value;
	};

	const getMove = (i, j) => gameBoard[i][j];
	const resetBoard = () => {
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				gameBoard[i][j] = "";
			}
		}
	};

	const getGameBoard = () => gameBoard;

	return {
		setMove,
		getMove,
		resetBoard,
		getGameBoard,
	};
}

// LOOK AT THIS FUNCTION NAMED getWinner. I can't figure out how to determine who won. it can determine someone won but not who.

function getWinner() {
	const isWinner = arr => {
		if (arr.every(move => move === "X")) return "X";
		else if (arr.every(move => move === "O")) return "O";
		else return null;
	};

	const _checkRow = () => {
		for (let i = 0; i < 3; i++) {
			let row = [];

			for (let j = 0; j < 3; j++) row.push(gameBoard.getMove(i, j));

			if (isWinner(row) !== null) return isWinner(row);
		}
		return null;
	};

	const _checkColumn = () => {
		for (let i = 0; i < 3; i++) {
			let col = [];

			for (let j = 0; j < 3; j++) col.push(gameBoard.getMove(j, i));

			if (isWinner(col) !== null) return isWinner(col);
		}
		return null;
	};

	const _checkDiagonal = () => {
		let diagonal1 = [];
		let diagonal2 = [];

		for (let i = 0; i < 3; i++) {
			diagonal1.push(gameBoard.getMove(i, i));
			diagonal2.push(gameBoard.getMove(i, 2 - i));
		}

		if (isWinner(diagonal1) !== null) return isWinner(diagonal1);
		else if (isWinner(diagonal2) !== null) return isWinner(diagonal2);
		else return null;
	};

	return _checkColumn() || _checkRow() || _checkDiagonal();
}

function features() {
	const newGame = () => {
		gameBoard.resetBoard();
		[...grid.children].forEach(x => (x.innerText = ""));
	};

	return {
		newGame,
	};
}

function render() {
	const fragment = document.createDocumentFragment();
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			const gridChildren = document.createElement("div");
			gridChildren.classList.add("game__child");
			gridChildren.classList.add(`${i}-${j}`);
			gridChildren.dataset.row = i;
			gridChildren.dataset.column = j;

			fragment.appendChild(gridChildren);
		}
	}
	grid.appendChild(fragment);
}

function main() {
	render(grid);

	let noOfMove = 0;

	const register = e => {
		const whichMove = noOfMove => (noOfMove % 2 ? "X" : "O");
		const target = e.target.closest(".game__child");
		const [row, col] = [target.dataset.row, target.dataset.column];

		if (!target.classList.contains("bruh")) {
			target.innerText = whichMove(noOfMove);

			gameBoard.setMove(row, col, whichMove(noOfMove));

			target.classList.add("bruh");
		} 

		if (getWinner() !== null) {
			[...grid.children].forEach(child => {
				child.removeEventListener("click", registerMove);
			});
		}

		console.log(getWinner());
	};
	const registerMove = e => {
		register(e);
		noOfMove++;
	};

	[...grid.children].forEach(child => {
		child.addEventListener("click", registerMove);
	});
}

main();
