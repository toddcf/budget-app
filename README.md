# Budget App

## Modularizing:

1. UI Module.
  - Get input value from data field.
  - Add the new data to the user interface.
  - Update the UI with the new budget amount.
2. Data Module.
  - Add new data to data structure.
  - Update the budget.
3. Controller Module (controls the app and serves as a link between the other modules).
  - Add event handler to handle user input of income/expense description & value.

## Techniques Learned:

- Visualization of Position Names:
  - beforebegin. (Would go before the beginning of the list.)
  - afterbegin. (Would be the first child of the list.)
  - beforeend. (Would be the last child of the list.)
  - afterend. (Would go after the end of the list.)
- querySelectorAll.
  - Returns a list instead of an array.
- Slice, which returns an array. (A trick for converting the list that querySelectorAll returned . . . back into an array.)
- forEach (as opposed to for loop).
- parseFloat(). Converts a string into a floating number (a number with decimals).