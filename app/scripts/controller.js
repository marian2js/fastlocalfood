/**
 * Controller for the App
 */
$(document).ready(function () {
	map.init();
	position.init(function () {
		map.showCurrentLocation();
		places.init();
	});
});