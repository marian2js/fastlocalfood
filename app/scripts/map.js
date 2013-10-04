/**
 * Maps API
 */
var map = (function () {
	var self = {},
		gmap;

	/**
	 * Start Map API and display Google Map
	 *
	 * @public
	 * @param {Function} ready Callback on map load Ready
	 * @returns {Object}
	 */
	self.init = function (ready) {
		var mapOptions = {
			zoom: 16,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		gmap = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		self.center();

		if (ready) {
			ready();
		}

		return self;
	};

	/**
	 * Show blue dot on user current location
	 *
	 * @public
	 * @link http://stackoverflow.com/questions/9142833/show-my-location-on-google-maps-api-v3
	 */
	self.showCurrentLocation = function () {
		new google.maps.Marker({
			position: new google.maps.LatLng(position.getLatitude(), position.getLongitude()),
			icon: new google.maps.MarkerImage(
				'//maps.gstatic.com/mapfiles/mobile/mobileimgs2.png',
				new google.maps.Size(22, 22),
				new google.maps.Point(0, 18),
				new google.maps.Point(11, 11)
			),
			zIndex: 100,
			map: gmap
		});
	};

	/**
	 * Center the map
	 *
	 * @public
	 * @param {float|null} latitude Latitude to center
	 * @param {float|null} longitude Longitude to center
	 * @returns {Object}
	 */
	self.center = function (latitude, longitude) {
		if (!latitude) {
			latitude = position.getLatitude();
		}
		if (!longitude) {
			longitude = position.getLongitude();
		}
		gmap.setCenter(new google.maps.LatLng(latitude, longitude));

		return self;
	};

	/**
	 * Add Place to Map and link with description of place
	 *
	 * @public
	 * @param {Object} place Place to add
	 */
	self.addPlace = function (place) {
		var pos = new google.maps.LatLng(place.geometry.location.lat, place.geometry.location.lng);
		var marker = new google.maps.Marker({
			position: pos,
			map: gmap,
			title: place.name
		});
		place.marker = marker;

		// Add effect on mouse enter
		$('#' + place.id).mouseenter(
			function () {
				marker.setAnimation(google.maps.Animation.BOUNCE);
				gmap.setCenter(pos);
			}).mouseleave(function () {
				marker.setAnimation(null);
			}
		);
	};

	/**
	 * Get Google Map Object
	 *
	 * @public
	 * @returns {Object}
	 */
	self.getMap = function () {
		return gmap;
	};

	return self;
})();