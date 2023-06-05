const feature = features();
const game1 = board();
// const gameBoard = game1.getGameBoard();
const $grid = document.querySelector("#game__grid");
const $footer = document.querySelector("footer");

feature.render($grid);

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

	const _checkRow = () => {
		for (let i = 0; i < 3; i++) {
			let row = [];

			for (let j = 0; j < 3; j++) row.push(game1.getMove(currentBoard, i, j));

			if (isWinner(row) !== null) return isWinner(row);
		}
		return null;
	};

	const _checkColumn = () => {
		for (let i = 0; i < 3; i++) {
			let col = [];

			for (let j = 0; j < 3; j++) col.push(game1.getMove(currentBoard, j, i));

			if (isWinner(col) !== null) return isWinner(col);
		}
		return null;
	};

	const _checkDiagonal = () => {
		let diagonal1 = [];
		let diagonal2 = [];

		for (let i = 0; i < 3; i++) {
			diagonal1.push(game1.getMove(currentBoard, i, i));
			diagonal2.push(game1.getMove(currentBoard, i, 2 - i));
		}

		return isWinner(diagonal1) || isWinner(diagonal2);
	};

	const _checkTie = () => {
		if (
			![...$grid.children].every(child =>
				child.classList.contains("changed")
			) ||
			ans !== null
		)
			return null;

		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++)
				if (game1.getMove(currentBoard, i, j) === "") return null;
		}

		return "Tied";
	};

	const ans = _checkColumn() || _checkRow() || _checkDiagonal();

	return ans || _checkTie();
}

function features() {
	const addClass = ($elem, className) => $elem.classList.add(className);
	const removeClass = ($elem, className) => $elem.classList.remove(className);
	const addAndRemoveClass = ($toAdd, $toRemove, className, delay = 0) => {
		addClass($toAdd, className);
		setTimeout(removeClass($toRemove, className), delay);
	};

	const resetGrid = $grid => {
		[...$grid.children].forEach($elem => {
			$elem.innerText = "";
			removeClass($elem, "changed");
		});
		// console.log($grid);}
	};

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
		startGame().newGame();
	};

	const playerWon = $grid => {
		[$grid.children].forEach(elem => addClass(elem, "blink"));
	};

	const highlightPlayer = ($footer, move) => {
		const player1 = $footer.children[0]; //HUMAN
		const player2 = $footer.children[2]; //COULD BE AI

		if (move % 2) addAndRemoveClass(player1, player2, "highlightPlayer");
		else addAndRemoveClass(player2, player1, "highlight");
	};

	const updateScore = winner => {
		if (winner === null) return;
		const player = document.getElementById("board" + winner).children[1];
		player.innerText++;
	};

	return {
		resetGrid,
		addClass,
		removeClass,
		render,
		highlightPlayer,
		updateScore,
		addAndRemoveClass,
		playerWon,
	};
}

function startGame() {
	let gameBoard, noOfMove; //to be updated in the newGame function
	const newGame = () => {
		gameBoard = game1.getGameBoard();
		feature.resetGrid($grid);
		noOfMove = 0;

		[...$grid.children].forEach(child => {
			child.addEventListener("click", registerMove, { once: true });
		});
	};

	const registerMove = e => {
		const whichMove = move => (move % 2 ? "X" : "O");

		const target = e.target.closest(".game__child"); //finds the clicked box
		const [row, col] = [target.dataset.row, target.dataset.column]; //determines the row and column in the array board

		if (!target.classList.contains("changed")) {
			target.innerText = whichMove(noOfMove);
			game1.setMove(gameBoard, row, col, whichMove(noOfMove));
			feature.addClass(target, "changed");
		}

		feature.highlightPlayer($footer, noOfMove);

		const winner = getWinner(gameBoard);
		feature.updateScore(winner);

		if (winner !== null) {
			feature.playerWon($grid);
			setTimeout(newGame, 1000);
		}
		noOfMove++;
	};

	return {
		newGame,
	};
}
