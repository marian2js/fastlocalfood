console.log('\n');

/**
 * Test if Google Maps API is working
 */
test('Test Google Maps', function() {
	equal(typeof google.maps.Map, 'function', 'Google Maps API not working');
});

/**
 * Test UI Interface
 */
test('Test UI', function () {
	// Simulate a new place
	var place = {
		id: 'place-123',
		name: 'Test Place',
		photo: app.getDefaultPhoto(),
		vicinity: 'Test address'
	},
		$modal = $('#modal'),
		$place;

	// Add the place to the page
	view.addPlace(place);
	$place = $('#places').find('#place-123');

	// Test if the place is in the html
	ok($place.length, 'View does not add places');

	// Test details modal
	$place.find('.details').click();
	ok($modal.is(':visible'), 'Modal not working with details');

	// Test reviews modal
	$place.find('.reviews').click();
	ok($modal.is(':visible'), 'Modal not working with reviews');

	// Test share modal
	$place.find('.share').click();
	ok($modal.is(':visible'), 'Modal not working with shares');

	// Test close modal
	$modal.find('.close').click();
	ok($modal.not().is(':visible'), 'Modal does not close');
});