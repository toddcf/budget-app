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
		inputBtn: ".add__btn",
		incomeContainer: ".income__list",
		expensesContainer: ".expenses__list"
	};

	return {
		getInput: function() {
			return {
				type: document.querySelector( DOMstrings.inputType ).value,
				description: document.querySelector( DOMstrings.inputDescription ).value,
				value: parseFloat(document.querySelector( DOMstrings.inputValue ).value)
			};
		},
		addListItem: function( obj, type ) {
			var html;
			var newHtml;
			var element;
			
			if ( type === "inc" ) {
				element = DOMstrings.incomeContainer;
				/*
				Create HTML string with placeholder text. NOTE: It CAN'T have line breaks or spaces between it.
				There is a version for if the type is expense and if the type is income.
				*/
				html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			}
			else if ( type === "exp" ) {
				element = DOMstrings.expensesContainer;
				html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			}
			// Replace the placeholder text with actual data received from the object.
			newHtml = html.replace( "%id%", obj.id );
			newHtml = newHtml.replace( "%description%", obj.description );
			newHtml = newHtml.replace( "%value%", obj.value );
			// Insert the HTML (for whichever element is in use) into the DOM, as the last element in the existing list.
			document.querySelector(element).insertAdjacentHTML("beforeend" , newHtml)
		},

		// Clear input fields upon button click or keypress:
		clearFields: function() {
			var fields;
			var fieldsArr;

			fields = document.querySelectorAll( DOMstrings.inputDescription + ", " + DOMstrings.inputValue );
			// Use slice to convert back into an array. Tricks it into thinking we gave it an array, so it returns an array:
			fieldsArr = Array.prototype.slice.call( fields );

			// Pass a callback function into this method, which will be applied to each of the elements in the array.
			// In the callback function, we have access to the current value, the indexOf, and the entire array.
			// This will loop through everything in the array and set the value of all of them back to an empty string:
			fieldsArr.forEach( function( current, index, array ) {
				current.value = "";
			});

			// Set focus back to Description field after submission:
			fieldsArr[0].focus();
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

		// Event listener for ENTER key, aka key 13:
		document.addEventListener( "keypress", function( event ) {
			if ( event.keyCode === 13 || event.which === 13 ) {
				ctrlAddItem();
			}
		});
	};

	// Update budget:
	var updateBudget = function() {
		// 1. Calculate the budget.
		// 2. Return the budget.
		// 3. Display budget in user interface.
	}

	// Control Add Item Function to be executed when button or ENTER key is clicked:
	var ctrlAddItem = function() {
		// 1. Get field input data.
		var input = UICtrl.getInput();
		// 2. Add item to budget controller.
		var newItem = budgetCtrl.addItem( input.type, input.description, input.value );
		// 3. Add the new item to the user interface.
		UICtrl.addListItem( newItem, input.type );
		// 4. Clear the fields.
		UICtrl.clearFields();
		// 5. Calculate and update budget (by calling that separate function).
		updateBudget();
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





