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
- Map. (Loops over an array and returns a brand new array.)
- parseFloat(). Converts a string into a floating number (a number with decimals).
- Using parentNode (multiple times if necessary) to traverse the DOM.
- Math.abs to get the absolute value of a number (no + or - value).
- toFixed() to set decimal places to a fixed amount.
- How to add a comma separator for every three digits in a number.
- Substring method: substr(); only takes part of a string.
- Using the Date object:
  - Get the current date.
  - getFullYear();
  - getMonth();
  - Creating an array of month names (as strings) to be accessed by getMonth();

## Future Iterations:

- Fix commas to appear every three digits instead of only after the first three digits.