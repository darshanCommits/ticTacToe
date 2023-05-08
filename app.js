// A tic tac toe game.

function main() {
	const grid = document.querySelector("#game__grid");
	let noOfMove = 0;

	(function render() {
		const fragment = document.createDocumentFragment();
		for (let i = 0; i < 16; i++) {
			const gridChildren = document.createElement("div");
			gridChildren.classList.add("game__child");
			fragment.appendChild(gridChildren);
		}
		grid.appendChild(fragment);
	})();

	function registerMove(e) {
		const whichMove = noOfMove => (noOfMove % 2 ? "X" : "O");
		const target = e.target.closest(".game__child");

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
