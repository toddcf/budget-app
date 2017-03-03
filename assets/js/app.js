// Budget Controller Module (an IIFE that returns an object):
var budgetController = ( function() {

	// Function constructor for expenses:
	var Expense = function( id, description, value ) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	// Function constructor for income:
	var Income = function( id, description, value ) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	/*
	Empty arrays in which to store all new expenses and incomes as they are created,
	all stored inside an object to keep the code clean and the data in one place:
	*/
	var data = {
		allItems = {
			exp: [],
			inc: []
		},
		totals = {
			exp: 0,
			inc: 0
		}
	}
	
}) ();

// UI Controller Module (also an IIFE):
var UIController = ( function() {
	
	var DOMstrings = {
		inputType: ".add__type",
		inputDescription: ".add__description",
		inputValue: ".add__value",
		inputBtn: ".add__btn"
	};

	return {
		getInput: function() {
			return {
				type: document.querySelector( DOMstrings.inputType ).value,
				description: document.querySelector( DOMstrings.inputDescription ).value,
				value: document.querySelector( DOMstrings.inputValue ).value
			};
		},
		// Export DOMstrings object for use in the Global App Controller:
		getDOMstrings: function() {
			return DOMstrings;
		}
	};
}) ();

// Global App Controller IIFE that communicates between all the other modules, which are passed into it as arguments:
var controller = ( function( budgetCtrl , UICtrl ) {

	var setupEventListeners = function() {
		
		// Import the UI Controller's exported DOMstrings object:
		var DOM = UICtrl.getDOMstrings();
		
		// Event listener for button click:
		document.querySelector( DOM.inputBtn ).addEventListener( "click", ctrlAddItem );

		// Event listener for ENTER key:
		document.addEventListener( "keypress", function( event ) {
			if ( event.keyCode === 13 || event.which === 13 ) {
				ctrlAddItem();
			}
		});
	};

	// Control Add Item Function to be executed when button or ENTER key is clicked:
	var ctrlAddItem = function() {
		// 1. Get field input data.
		var input = UICtrl.getInput();
		// 2. Add item to budget controller.
		// 3. Add the new item to the user interface.
		// 4. Calculate the budget.
		// 5. Display budget in user interface.
	};

	return {
		// Initialization function to call the event listeners that are inside this Global App Controller:
		init: function() {
			console.log( "Application has started." );
			setupEventListeners();
		}
	}

}) ( budgetController , UIController );

// Call the init function to start the app:
controller.init();





