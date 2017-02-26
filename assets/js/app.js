// Budget Controller Module (an IIFE that returns an object):
var budgetController = (function() {
	var x = 23;
	var add = function(a) {
		return x + a;
	};
	return {
		publicTest: function(b) {
			console.log(add(b));
		}
	}
})();

// UI Controller Module (also an IIFE):
var UIController = (function() {

})();

// App Controller that brokers all the different modules:
var controller = (function() {
	
})();