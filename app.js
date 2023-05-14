// A tic tac toe game.
const grid = document.querySelector("#game__grid");
const gameBoard = board();
const feature = features();

function board() {
	let gameBoard = [[], [], []];

	const getGameBoard = () => gameBoard; // returns the gameBoard
	const getMove = (i, j) => gameBoard[i][j]; // gets the value for said index
	const setMove = (i, j, value) => (gameBoard[i][j] = value); // sets the value for said index

	const resetBoard = () => {
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				gameBoard[i][j] = "";
			}
		}
	};

	return {
		getMove,
		setMove,
		resetBoard,
		getGameBoard,
	};
}

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

	// console.log(gameBoard.getLength());

	const _checkTie = () => {
		if (
			[...grid.children].every(
				!(child => child.classList.contains("changed"))
			) ||
			ans !== null
		)
			return null;

		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++)
				if (gameBoard.getMove(i, j) === "") return null;
		}

		return "Tied";
	};

	let ans = _checkColumn() || _checkRow() || _checkDiagonal();

	return ans || _checkTie();
}

// WIP

function features() {
	const winnerTab = document.querySelector("#winner__tab");
	const winnerName = document.querySelector("#winner__name");

	const render = grid => {
		const fragment = document.createDocumentFragment();
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				const gridChildren = document.createElement("div");
				gridChildren.classList.add("game__child");
				gridChildren.dataset.row = i;
				gridChildren.dataset.column = j;

				fragment.appendChild(gridChildren);
			}
		}
		grid.appendChild(fragment);
	};

	const newGame = () => {
		gameBoard.resetBoard();
		noOfMove = 0;

		winnerTab.classList.remove("visible");
		winnerName.innerText = "";

		[...grid.children].forEach(x => {
			x.innerText = "";
			x.classList.remove("changed");
		});
	};

	const renderWinner = winner => {
		winnerTab.classList.add("visible");
		winnerName.innerText = winner;
	};

	return {
		render,
		newGame,
		renderWinner,
	};
}

function main() {
	feature.render(grid);

	let noOfMove = 0;

	const register = e => {
		const target = e.target.closest(".game__child");
		const [row, col] = [target.dataset.row, target.dataset.column];

		const whichMove = noOfMove => (noOfMove % 2 ? "X" : "O");

		if (!target.classList.contains("changed")) {
			target.innerText = whichMove(noOfMove);

			gameBoard.setMove(row, col, whichMove(noOfMove));

			target.classList.add("changed");
		}

		//this removes event listener if there is already a registered move.

		if (getWinner() !== null) {
			[...grid.children].forEach(child =>
				child.removeEventListener("click", registerMove)
			);
		}

		const winner = getWinner();
		console.log(winner);
		if (winner !== null) {
			// features.renderWinner(winner);
		}
	};

	const registerMove = e => {
		register(e);
		noOfMove++;
	};

	[...grid.children].forEach(child =>
		child.addEventListener("click", registerMove, { once: true })
	);
}

main();
