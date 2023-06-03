const game1 = board();
const grid = document.querySelector("#game__grid");
features().render(grid);

main(grid, game1);

// Tic Tac Toe game

function board() {
	const getGameBoard = () => [[], [], []]; // returns the gameBoard

	const getMove = (board, i, j) => board[i][j]; // gets the value for said index
	const setMove = (board, i, j, value) => (board[i][j] = value); // sets the value for said index

	return {
		getMove,
		setMove,
		getGameBoard,
	};
}

function getWinner(currentBoard) {
	const isWinner = arr => {
		if (arr.every(move => move === "X")) return "X";
		else if (arr.every(move => move === "O")) return "O";
		else return null;
	};

	const _checkRow = board => {
		for (let i = 0; i < 3; i++) {
			let row = [];

			for (let j = 0; j < 3; j++) row.push(game1.getMove(board, i, j));

			if (isWinner(row) !== null) return isWinner(row);
		}
		return null;
	};

	const _checkColumn = board => {
		for (let i = 0; i < 3; i++) {
			let col = [];

			for (let j = 0; j < 3; j++) col.push(game1.getMove(board, j, i));

			if (isWinner(col) !== null) return isWinner(col);
		}
		return null;
	};

	const _checkDiagonal = board => {
		let diagonal1 = [];
		let diagonal2 = [];

		for (let i = 0; i < 3; i++) {
			diagonal1.push(game1.getMove(board, i, i));
			diagonal2.push(game1.getMove(board, i, 2 - i));
		}

		return isWinner(diagonal1) || isWinner(diagonal2);
	};

	const _checkTie = board => {
		if (
			![...grid.children].every(child => child.classList.contains("changed")) ||
			ans !== null
		)
			return null;

		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++)
				if (game1.getMove(board, i, j) === "") return null;
		}

		return "Tied";
	};

	const ans =
		_checkColumn(currentBoard) ||
		_checkRow(currentBoard) ||
		_checkDiagonal(currentBoard);

	return ans || _checkTie(currentBoard);
}

function features() {
	const render = $grid => {
		const _createGameChild = (i, j) => {
			const gridChildren = document.createElement("div");
			gridChildren.classList.add("game__child");
			gridChildren.dataset.row = i;
			gridChildren.dataset.column = j;

			return gridChildren;
		};

		const fragment = document.createDocumentFragment();

		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				const child = _createGameChild(i, j);
				fragment.appendChild(child);
			}
		}
		$grid.appendChild(fragment);
	};

	return {
		render,
	};
}

function main(grid, currentBoard) {
	const gameBoard = game1.getGameBoard();

	let noOfMove = 0;

	const registerMove = e => {
		const register = e => {
			const whichMove = noOfMove => (noOfMove % 2 ? "X" : "O");

			const target = e.target.closest(".game__child");
			const [row, col] = [target.dataset.row, target.dataset.column];

			if (!target.classList.contains("changed")) {
				target.innerText = whichMove(noOfMove);

				currentBoard.setMove(gameBoard, row, col, whichMove(noOfMove));

				target.classList.add("changed");
			}
		};

		register(e);
		const winner = getWinner(gameBoard);

		console.log(winner);

		noOfMove++;
	};

	// event listeners

	[...grid.children].forEach(child =>
		child.addEventListener("click", registerMove, { once: true })
	);
}
