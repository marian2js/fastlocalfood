/**
 * Position API
 */
var position = (function () {
	var self = {},
		current = {},
		located = false,
		readyCallback;

	/**
	 * Start position API
	 *
	 * @public
	 * @param {Function} ready Callback on Success
	 * @returns {Object}
	 */
	self.init = function (ready) {
		ask();
		// Check Browser
		if (!navigator.geolocation) {
			app.setError('Please enable geolocation in your browser');
			return self;
		}
		readyCallback = ready;
		search();

		return self;
	};

	/**
	 * Show message asking for user position
	 *
	 * @private
	 */
	var ask = function () {
		var $where = $('#share-location'),
			$button = $where.find('a');

		// Show "Where You Are?" option.
		$where.show('shake', 1000);

		// Search location on click
		$button.click(this.search);
	};

	/**
	 * Perform position search
	 *
	 * @private
	 */
	var search = function () {
		navigator.geolocation.getCurrentPosition(
			function (pos) {
				// Do not ask for location
				$('#share-location').hide();

				// Save current location
				located = true;
				current = {
					lat: pos.coords.latitude,
					long: pos.coords.longitude
				};

				// Center Map on current location
				map.center(current.lat, current.long);

				// Call ready callback.
				if (readyCallback) {
					readyCallback();
				}
			},

			// If error occurred, ask for location again
			function (error) {
				ask();
			}
		);
	};

	/**
	 * Get user Latitude, if is not located return Globant BA Latitude
	 *
	 * @public
	 * @returns {float}
	 */
	self.getLatitude = function () {
		return located ? current.lat : '-34.6200444';
	};

	/**
	 * Get user Longitude, if is not located return Globant BA Longitude
	 *
	 * @public
	 * @returns {float}
	 */
	self.getLongitude = function () {
		return located ? current.long: '-58.3672517';
	};

	/**
	 * Check if user is located
	 *
	 * @public
	 * @returns {boolean}
	 */
	self.isLocated = function () {
		return located;
	};

	return self;
})();