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
		allItems: {
			exp: [],
			inc: []
		},
		totals: {
			exp: 0,
			inc: 0
		}
	};

	return {
		addItem: function( type, des, val ) {
			var newItem;
			var ID;
			/*
			Generate an ID number that is the next number after the last number in the appropriate array.
			But the array must have a length greater than zero or else it will be -1 and return undefined.
			So if it is not greater than zero, manually set it to zero.
			*/
			if ( data.allItems[type].length > 0 ) {
				ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
			}
			else {
				ID = 0;
			}

			// If the new item being created is an expense, use the Expense function constructor:
			if ( type === "exp" ) {
				newItem = new Expense ( ID, des, val);
			}
			// If the new item being created is income, use the Income function constructor:
			else if ( type === "inc" ) {
				newItem = new Income ( ID, des, val);
			}

			// Pass whichever type it is into this statement so that it adds the data to the end of the appropriate array:
			data.allItems[type].push( newItem );
			// Give the other controller access to this item:
			return newItem;
		},
		testing: function() {
			console.log( data );
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
		addListItem: function( obj, type ) {
			var html;
			// Create HTML string with placeholder text. NOTE: It CAN'T have line breaks or spaces between it.
			html = '<div class="item clearfix" id="income-0"><div class="item__description">Salary</div><div class="right clearfix"><div class="item__value">+ 2,100.00</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			// Replace the placeholder text with actual data received from the object.
			// Insert the HTML into the DOM.
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
		var newItem = budgetCtrl.addItem( input.type, input.description, input.value );
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





