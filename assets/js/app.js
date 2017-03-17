// Budget Controller Module (an IIFE that returns an object):
var budgetController = ( function() {

	// Function constructor for expenses:
	var Expense = function( id, description, value ) {
		this.id = id;
		this.description = description;
		this.value = value;
		this.percentage = -1;
	};

	Expense.prototype.calcPercentage = function( totalIncome ) {
		// Only calculate the percentage if totalIncome is greater than zero:
		if ( totalIncome > 0 ) {
			this.percentage = Math.round ( ( this.value / totalIncome ) * 100 );
		}
		else {
			this.percentage = -1;
		}
	};

	// Function constructor for income:
	var Income = function( id, description, value ) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	var calculateTotal = function( type ) {
		// Set initial value of sum to zero:
		var sum = 0;
		// Loop over entire array. 'cur' refers to either income or expense:
		data.allItems[type].forEach(function( cur ) {
			// Shorter way of writing sum = sum + cur.value:
			sum += cur.value;
			data.totals[type] = sum;
		});
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
		},
		budget: 0,
		// Initialize percentage to -1 so that if there are no values to calculate yet, the percentage is nonexistent:
		percentage: -1
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

		// Method for deleting items from the list:
		deleteItem: function( type, id ) {
			var ids;
			var index;
			// Loop over all items in either the Income or Expenses array and return a new array with the current id:
			ids = data.allItems[type].map( function ( current ) {
				return current.id;
			});

			// Get the index of the id that we passed into the method, and store it in the variable INDEX:
			index = ids.indexOf( id );

			// Only delete if the index exists:
			if ( index !== -1 ) {
				// Start deleting at the index number; only delete that one element:
				data.allItems[type].splice( index, 1 );
			}
		},

		calculateBudget: function() {
			// 1. Calculate total income and expenses.
			calculateTotal("exp");
			calculateTotal("inc");
			// 2. Calculate budget (income - expenses) and store it in the global data variable:
			data.budget = data.totals.inc - data.totals.exp;
			// 3. Calculate percentage of income spent (but only if it's greater than zero -- otherwise it throws off the calculation).
			if ( data.totals.inc > 0 ) {
				data.percentage = Math.round( ( data.totals.exp / data.totals.inc ) * 100 );
			}
			else {
				data.percentage = -1;
			}
		},

		calculatePercentages: function() {

		},

		// Function that returns the budget as an object:
		getBudget: function() {
			return {
				budget: data.budget,
				totalInc: data.totals.inc,
				totalExp: data.totals.exp,
				percentage: data.percentage
			};
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
		expensesContainer: ".expenses__list",
		budgetLabel: ".budget__value",
		incomeLabel: ".budget__income--value",
		expensesLabel: ".budget__expenses--value",
		percentageLabel: ".budget__expenses--percentage",
		container: ".container"
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
				html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			}
			else if ( type === "exp" ) {
				element = DOMstrings.expensesContainer;
				html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
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

		displayBudget: function( obj ) {
			document.querySelector( DOMstrings.budgetLabel ).textContent = obj.budget;
			document.querySelector( DOMstrings.incomeLabel ).textContent = obj.totalInc;
			document.querySelector( DOMstrings.expensesLabel ).textContent = obj.totalExp;
			
			if ( obj.percentage > 0 ) {
				document.querySelector( DOMstrings.percentageLabel ).textContent = obj.percentage + "%";
			}
			else {
				document.querySelector( DOMstrings.percentageLabel ).textContent = "--%";
			}
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

		// Event listener for delete buttons:
		document.querySelector( DOM.container ).addEventListener( "click", ctrlDeleteItem );
	};

	// Update budget:
	var updateBudget = function() {
		// 1. Calculate the budget.
		budgetCtrl.calculateBudget();
		// 2. Return the budget.
		var budget = budgetCtrl.getBudget();
		// 3. Display budget in user interface.
		UICtrl.displayBudget( budget );
	};

	var updatePercentages = function() {
		// 1. Calculate percentages.
		// 2. Read percentages from the budget controller.
		// 3. Update the user interface with the new percentages.
	};

	// Control Add Item Function to be executed when button or ENTER key is clicked:
	var ctrlAddItem = function() {
		// 1. Get field input data.
		var input = UICtrl.getInput();
		// Validate input before accepting it. Can't be empty string; must be a number; must be greater than zero:
		if ( input.description !== "" && !isNaN(input.value) && input.value > 0 ) {
			// 2. Add item to budget controller.
			var newItem = budgetCtrl.addItem( input.type, input.description, input.value );
			// 3. Add the new item to the user interface.
			UICtrl.addListItem( newItem, input.type );
			// 4. Clear the fields.
			UICtrl.clearFields();
			// 5. Calculate and update budget (by calling that separate function).
			updateBudget();
			// 6. Calculate and update percentages.
			updatePercentages();
		}
	};

	var ctrlDeleteItem = function( event ) {
		var itemID;
		var splitID;
		var type;
		var ID;
		// Traverse the DOM up to the div we want to delete:
		itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

		// Only if itemID exists:
		if ( itemID ) {
			// When calling these methods on a string, JavaScript converts them into objects.
			// We can now use the "split" method on this string/object. We will split it at the dash.
			// Now we can separate the type (income or expense) from the ID (0, 1, 2, 3, etc.).
			splitID	= itemID.split( "-" );
			type	= splitID[0];
			// Convert to integer and store in ID variable:
			ID		= parseInt( splitID[1] );

			// 1. Delete the item from the data structure.
			budgetCtrl.deleteItem( type, ID );
			// 2. Delete the item from the user interface.
			UICtrl.deleteListItem( itemID );
			// 3. Update and show the new budget.
			updateBudget();
			// 4. Calculate and update percentages.
			updatePercentages();
		}
	};

	return {
		// Initialization function to call the event listeners that are inside this Global App Controller:
		init: function() {
			console.log( "Application has started." );
			// Reset everything to zero upon first starting:
			UICtrl.displayBudget({
				budget: 0,
				totalInc: 0,
				totalExp: 0,
				percentage: -1
			});
			setupEventListeners();
		}
	}

}) ( budgetController , UIController );

// Call the init function to start the app:
controller.init();





