// Budget Controller Module (an IIFE that returns an object):
var budgetController = ( function() {
	var x = 23;
	var add = function( a ) {
		return x + a;
	};
	return {
		publicTest: function( b ) {
			return ( add ( b ) );
		}
	}
}) ();

// UI Controller Module (also an IIFE):
var UIController = ( function() {

}) ();

// App Controller that brokers all the different modules, which are passed into it as arguments:
var controller = ( function( budgetCtrl , UICtrl ) {
	var z = budgetCtrl.publicTest ( 5 );
	return {
		anotherPublic: function() {
			console.log ( z );
		}
	}
}) ( budgetController , UIController );