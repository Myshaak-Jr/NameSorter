const wordsContainer = document.getElementById("words-container");
var mode = "input"


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

function buttonActivate(e) {
	if (wordsContainer.children.length == 1) return;
	switch (mode) {
		case "input":
			shuffle(e);
			break;
		case "shuffled":
			reset(e);
			break;
	}
}

function shuffle(e) {
	// change mode
	mode = "shuffled";
	document.getElementById("button").innerText = "UPRAVIT";
	wordsContainer.style.flexDirection = "column";

	// disable input
	for (let index = 0; index < wordsContainer.children.length; index++) {
		const word = wordsContainer.children[index];
		word.setAttribute("contenteditable", false);
	}

	// remove the blank input box
	if (wordsContainer.children[wordsContainer.children.length - 1].innerHTML == "") {
		wordsContainer.removeChild(wordsContainer.children[wordsContainer.children.length - 1]);
	}

	// control for name "Richard Smatana"
	let found = 0;
	for (let index = 0; index < wordsContainer.children.length; index++) {
		const word = wordsContainer.children[index];
		
		if (word.innerHTML.match(/richard smatana/i)) {
			// swap it with the first word
			[word.style.order, wordsContainer.children[0].style.order] = [wordsContainer.children[0].style.order, word.style.order];
			found = 1;

			console.log("found");
		}
	}

	// sort words by order
	[...wordsContainer.children].sort((a,b)=>parseInt(a.style.order)>parseInt(b.style.order)?1:-1).forEach(node=>wordsContainer.appendChild(node));

	// console.log(Array.from(wordsContainer.children).map(a => [a.innerHTML, a.style.order]));

	for (let index = found; index < wordsContainer.children.length; index++) {
		const randomIndex = Math.floor(Math.random() * (wordsContainer.children.length - found)) + found;

		console.log(index, randomIndex);
		// swap orders
		[wordsContainer.children[index].style.order, wordsContainer.children[randomIndex].style.order] =
		[wordsContainer.children[randomIndex].style.order, wordsContainer.children[index].style.order];
	}

	// sort again (for copying)
	[...wordsContainer.children].sort((a,b)=>parseInt(a.style.order)>parseInt(b.style.order)?1:-1).forEach(node=>wordsContainer.appendChild(node));

	// console.log(Array.from(wordsContainer.children).map(a => [a.innerHTML, a.style.order]));
}

function reset(e) {
	// change mode
	mode = "input";
	document.getElementById("button").innerText = "ZAMÍCHEJ";
	wordsContainer.style.flexDirection = "row";

	// enable input
	for (let index = 0; index < wordsContainer.children.length; index++) {
		const word = wordsContainer.children[index];
		word.setAttribute("contenteditable", true);
	}

	// add the blank input
	addInput();
}