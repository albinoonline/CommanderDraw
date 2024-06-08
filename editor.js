/*
TODO:
Inputs:
deck size, quick options 99,98 (not 97) 60,59, but also number input
number of desired card/effect (a range/ text input with a maximum equal to deck size)
N, a variable number of cards to have drawn out of the deck defaulting to 12, with a range of 1 to the desired card count

outputs:
% of deck that is the desired card.
7 drawn: chance of having 1; average number you would draw
8 drawn: chance of having 1; average number you would draw
N drawn: chance of having 1; average number you would draw

number of cards drawn to 50% 1 card

Logic:
left- the cards leftover, starts at deck size
we need a function that gives us the chance of drawing a desired card out of what remains of the deck
	result[i]= desired/left // chance of getting the desired card
	left -=1


we run this function until the entire deck is drawn, noting when the 50% point is.

*/
function roundThou(num){
	return Math.round(num*1000)/10;
}


window.onload = function() {
	
	console.log("loaded");
	//find things on the page
	const deckSizeElement = document.getElementById('deckSize');
	const desiredElement = document.getElementById('desired');
	const customDrawElement = document.getElementById('customDraw');
	
	//add event listeners
	deckSizeElement.addEventListener("change", function(){Update();});
	desiredElement.addEventListener("change", function(){Update();});
	customDrawElement.addEventListener("change", function(){Update();});
	
	function Update(){
		//get deck size
		let deckSize = parseInt(deckSizeElement.value);
		//set number maximums
		desiredElement.max=deckSize;
		customDrawElement.max=deckSize;
		desiredElement.value=Math.min(desiredElement.value, deckSize);
		customDrawElement.value=Math.min(customDrawElement.value, deckSize);
		//do the calculation
		let desired = parseInt(desiredElement.value);
		let customDraw = parseInt(customDrawElement.value);
		
		let fiftyPercent=0;
		let leftover = deckSize;
		let result = [];
		let runningResult=1;// *result of failure, need to 1-

		

		for (let i = 0; i < deckSize; i++) {
			let thisDrawChance=desired / leftover; // chance of getting the desired card this draw
			leftover--;
			
			//change of getting the card overall
			runningResult*=1-thisDrawChance;
			//store in result
			result[i] = {running:roundThou(1-runningResult),thisDraw:roundThou(thisDrawChance)};
			
			//document.getElementById("help").innerHTML += ` <p>Card ${i+1}: ${result[i].running}% so far,		${result[i].thisDraw}% from this draw</p>`;

			if(runningResult > 0.5){
				fiftyPercent=i+2;//plus 1 for conversion to count from 1, plus 1 becouse we want to be over 50%, where this stops updating just before
			}
		}
		document.getElementById("help").innerHTML = ` <p>${result[0].thisDraw}% of the library is in the desired pool</p>`;
		document.getElementById("help").innerHTML += ` <p>at ${fiftyPercent} card(s) drawn, you have a 50% chance of having a pool card</p>`;
		document.getElementById("help").innerHTML += " <p>Chance of getting a pool card per draw</p>";
		document.getElementById("help").innerHTML += ` <p>Card 7: ${result[6].running}% so far,		${result[6].thisDraw}% from this draw alone</p>`;
		document.getElementById("help").innerHTML += ` <p>Card 8: ${result[7].running}% so far,		${result[7].thisDraw}% from this draw alone</p>`;
		document.getElementById("help").innerHTML += ` <p>Card ${customDraw}: ${result[customDraw-1].running}% so far,		${result[customDraw-1].thisDraw}% from this draw alone</p>`;
	}

	
};
