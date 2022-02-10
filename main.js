const wordsContainer = document.getElementById("words-container");


function keyPressed(e) {
	var key = e.keyCode || e.charCode;  // ie||others
	// if pressed enter focusout and not new line
	if (key == 13) {
		e.srcElement.blur();
		e.preventDefault();
	}
}

function onInput(e) {
	const source = e.srcElement;

	if (!source.nextElementSibling && source.innerHTML) addInput();
	else if (source.nextElementSibling && !source.innerHTML) {
		// remove element if it is blank
		wordsContainer.removeChild(source);
	}
	
	// source.innerHTML = source.innerHTML.trim();
}

function addInput() {
	// adds blank input at the end of container
	let newInput = wordsContainer.children[wordsContainer.children.length - 1].cloneNode(false);
	newInput.style.order = parseInt(newInput.style.order) + 1; // increase order
	wordsContainer.appendChild(newInput);

	wordsContainer.children[wordsContainer.children.length - 1].focus(); // focus on last input
}

function shuffle(e) {
	// remove the blank input box
	wordsContainer.removeChild(wordsContainer.children[wordsContainer.children.length - 1]);

	// control for name "Richard Smatana"
	let found = 0;
	for (let index = 0; index < wordsContainer.children.length; index++) {
		const word = wordsContainer.children[index];
		if (word.innerHTML == "Richard Smatana") {
			// swap it with the first word
			[word.style.order, wordsContainer.children[0].style.order] = [wordsContainer.children[0].style.order, word.style.order];
			found = 1;

			console.log("found");
		}
	}

	console.log(Array.from(wordsContainer.children).map(a => [a.innerHTML, a.style.order]));

	for (let index = found; index < wordsContainer.children.length; index++) {
		const randomIndex = Math.floor(Math.random() * (wordsContainer.children.length - found)) + found;

		console.log(index, randomIndex);
		// swap orders
		[wordsContainer.children[index].style.order, wordsContainer.children[randomIndex].style.order] =
		[wordsContainer.children[randomIndex].style.order, wordsContainer.children[index].style.order];
	}

	console.log(Array.from(wordsContainer.children).map(a => [a.innerHTML, a.style.order]));

	wordsContainer.style.flexDirection = "column";
}