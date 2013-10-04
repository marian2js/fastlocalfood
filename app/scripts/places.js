/**
 * Places API
 */
var places = (function () {
	var self = {
			radius: 1000,
			types: 'food|cafe|bar|restaurant',
			sensor: 'true'
		},
		list = [],
		nextPageToken,
		attributions,
		readyCallback;

	/**
	 * Start places API
	 *
	 * @public
	 * @param {Function} ready Callback on load Ready
	 */
	self.init = function (ready) {
		readyCallback = ready;
		nearbySearch();
	};

	/**
	 * Search nearby places using Google Places API
	 *
	 * @private
	 */
	var nearbySearch = function () {
		if (!position.isLocated()) {
			return;
		}

		requestPlaces(
			'location=' + position.getLatitude() + ',' + position.getLongitude() +
			'&radius=' + self.radius +
			'&types=' + self.types +
			'&sensor=' + self.sensor
		);
	};

	/**
	 * Search for more results, used for pagination proposes
	 *
	 * @public
	 */
	self.getMorePlaces = function () {
		requestPlaces(
			'location=' + position.getLatitude() + ',' + position.getLongitude() +
			'&pagetoken=' + nextPageToken +
			'&radius=' + self.radius +
			'&types=' + self.types +
			'&sensor=' + self.sensor
		);
	};

	/**
	 * Perform Ajax request for get a list of places
	 *
	 * @private
	 * @param {string} data Data for Google Places API
	 */
	var requestPlaces = function (data) {
		$.ajax({
			url: '/api/places.php',
			dataType: 'json',
			data: data,
			beforeSubmit: app.startLoading(),
			success: function (response) {
				processResponse(response);
				if (readyCallback) {
					readyCallback();
				}
			}
		}).error(function () {
			app.setError('Unexpected error occurred!');
		}).complete(function () {
			app.stopLoading();
		});
	};

	/**
	 * Add Ajax response to list attribute and save needed data
	 *
	 * @private
	 * @param {Object} response
	 */
	var processResponse = function (response) {
		var current = list.length,
			total;

		// Append new places to the list
		list.push.apply(list, response.results);

		// Add Places to Map and View
		total = list.length;
		for (var i = current; i < total; i++) {
			addPlace(list[i], i);
		}

		nextPageToken = response.next_page_token;
		attributions = response.html_attributions[0];

		// Add Show More Button
		if (nextPageToken) {
			view.showMoreButton(nextPageToken);
		}
	};

	/**
	 * Add new place to the site
	 *
	 * @private
	 * @param {Object} place Place to add
	 * @param {integer} i Place number
	 */
	var addPlace = function (place, i) {
		// Set unique id
		place.id = 'place-' + i;

		view.addPlace(place);
		map.addPlace(place);
	};

	/**
	 * Use Google Places API to get a photo for a place
	 *
	 * @public
	 * @param {Object} place Place to get the photo
	 * @returns {string} Photo url
	 */
	self.getPhoto = function (place) {
		// Check if place has photo
		if (!place.photos || !place.photos[0].photo_reference) {
			place.photo = app.getDefaultPhoto();
		}
		else {
			place.photo = '/api/photo.php?maxwidth=400&photoreference=' + place.photos[0].photo_reference + '&sensor=true';
		}

		return place.photo;
	};

	/**
	 * Perform Ajax request for get details for a place
	 *
	 * @public
	 * @param {Object} place Place to get Details
	 * @param {Function} callback Callback on Success
	 * @param {Function} errorCallback Callback on Error
	 * @returns {Object} Details for the place
	 */
	self.getDetails = function (place, callback, errorCallback) {

		if (place.details) {
			callback(place.details);
			return place.details;
		}

		$.ajax({
			url: '/api/details.php',
			dataType: 'json',
			data: 'reference=' + place.reference + '&sensor=true',
			success: function (response) {
				place.details = response.result;
				callback(place.details);
			}
		}).error(errorCallback);

		return place.details;
	};

	/**
	 * Return list of loaded places
	 *
	 * @public
	 * @returns {Array}
	 */
	self.getAll = function () {
		return list;
	};

	return self;
})();