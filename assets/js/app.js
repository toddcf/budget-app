// Budget Controller Module (an IIFE that returns an object):
var budgetController = ( function() {
	
}) ();

// UI Controller Module (also an IIFE):
var UIController = ( function() {
	return {
		getInput: function() {
			return {
				type: document.querySelector(".add__type").value,
				description: document.querySelector(".add__description").value,
				value: document.querySelector(".add__value").value
			};
		}
	};
}) ();

// Global App Controller IIFE that communicates between all the other modules, which are passed into it as arguments:
var controller = ( function( budgetCtrl , UICtrl ) {

	// Control Add Item Function to be executed when button or ENTER key is clicked:
	var ctrlAddItem = function() {
		// 1. Get field input data.
		var input = UICtrl.getInput();
		console.log(input);
		// 2. Add item to budget controller.
		// 3. Add the new item to the user interface.
		// 4. Calculate the budget.
		// 5. Display budget in user interface.
	}

	// Event listener for button click:
	document.querySelector(".add__btn").addEventListener("click", ctrlAddItem );

	// Event listener for ENTER key:
	document.addEventListener("keypress", function(event) {
		if ( event.keyCode === 13 || event.which === 13 ) {
			ctrlAddItem();
		}
	});
}) ( budgetController , UIController );