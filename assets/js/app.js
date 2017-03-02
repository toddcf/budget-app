// Budget Controller Module (an IIFE that returns an object):
var budgetController = ( function() {
	
}) ();

// UI Controller Module (also an IIFE):
var UIController = ( function() {

}) ();

// Global App Controller that communicates between all the other modules, which are passed into it as arguments:
var controller = ( function( budgetCtrl , UICtrl ) {
	// Event listener for button click:
	document.querySelector(".add__btn").addEventListener("click", function() {
		// 1. Get field input data.
		// 2. Add item to budget controller.
		// 3. Add the new item to the user interface.
		// 4. Calculate the budget.
		// 5. Display budget in user interface.
	});

	// Event listener for ENTER key:
	document.addEventListener("keypress", function(event) {
		if ( event.keyCode === 13 || event.which === 13 ) {
			console.log("ENTER was pressed.");
		}
	});
}) ( budgetController , UIController );