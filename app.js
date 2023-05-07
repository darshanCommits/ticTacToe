

function main () {
	const grid = document.querySelector("#game__grid");

  (function render () {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 16; i++) {
      const gridChildren = document.createElement("div");
      gridChildren.classList.add("game__child");
      fragment.appendChild(gridChildren);
    }
    grid.appendChild(fragment);
  })();

  


}