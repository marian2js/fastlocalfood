/**
 * Manage Site View
 */
var view = (function () {
	var self = {},
		placesAdded = 0;

	/**
	 * Add place to the site
	 *
	 * @public
	 * @param {Object} place Place to add
	 */
	self.addPlace = function (place) {
		var $places = $('#places'),
			$lastRow,
			$place;

		// 3 Places per row
		if (placesAdded % 3 === 0) {
			$places.append('<div class="row"></div> ');
		}

		$lastRow = $places.find('.row:last');
		$lastRow.append(
			'<div class="col-md-4 place-item" id="' + place.id + '">' +
				'<div class="thumbnail">' +
					'<img src="' + places.getPhoto(place) + '">' +
					'<div class="caption">' +
						'<h3>' + place.name + '</h3>' +
						'<p>' + place.vicinity + '</p>' +
						'<p>' +
							'<a data-toggle="modal" href="#modal" class="btn btn-primary details">View Details</a> ' +
							'<a data-toggle="modal" href="#modal" class="btn btn-primary reviews">View Reviews</a> ' +
							'<a data-toggle="modal" href="#modal" class="btn btn-primary share">Share Place</a>' +
						'</p>' +
					'</div>' +
				'</div>' +
			'</div>'
		);
		$place = $('#' + place.id);

		// Add details modal
		$place.find('.details').click(function () {
			showDetailsModal(place);
		});

		// Add reviews modal
		$place.find('.reviews').click(function () {
			showReviewsModal(place);
		});

        // Add share modal
		$place.find('.share').click(function () {
			showShareModal(place);
		});

		placesAdded++;
	};

	/**
	 * Show modal with place details
	 *
	 * @private
	 * @param {Object} place Place to show details
	 */
	var showDetailsModal = function (place) {
		showLoadingModal(place);

		places.getDetails(place, function (details) {
			var $modal = $('#modal'),
				$body = $modal.find('.modal-body');

			configDialog(details, $modal, $body);

			// Phone number
			if (details.formatted_phone_number) {
				$body.append(
					'<i class="icon-phone"></i> ' +
					'<strong>Phone Number: </strong>' +
					details.formatted_phone_number + '<hr>'
				);
			}

			// Web Site
			if (details.website) {
				$body.append(
					'<i class="icon-external-link"></i> ' +
					'<strong>Web Site: </strong><a href="' + details.website + '" target="_blank">' + details.website + '</a><hr>'
				);
			}

			// Rating
			if (details.rating) {
				$body.append(
					'<i class="icon-thumbs-up"></i> ' +
					'<strong>Rating: </strong>' + details.rating + '<hr>'
				);
			}

			// Google Plus
			if (details.url) {
				$body.append(
					'<i class="icon-google-plus-sign"></i> ' +
					'<strong><a href="' + details.url + '" target="_blank">Google Plus</a></strong><hr>'
				);
			}

			if (details.reviews && details.reviews.length) {
				$body.append(
					'<i class="icon-comments"></i> ' +
					'<strong><a class="reviews link">View Reviews</a></strong><hr>'
				);
				$body.find('.reviews').click(function () {
					showReviewsModal(place);
				});
			}

		}, showErrorDialog);
	};

	/**
	 * Show modal with place reviews
	 *
	 * @private
 	 * @param {Object} place Place to show reviews
	 */
	var showReviewsModal = function (place) {
		showLoadingModal(place);

		places.getDetails(place, function (details) {
			var $modal = $('#modal'),
				$body = $modal.find('.modal-body'),
				reviews = details.reviews,
				total;

			configDialog(details, $modal, $body);

			if (!reviews) {
				$body.html('<div class="alert alert-danger">This place has no reviews.</div>');
				return;
			}

			total = reviews.length;
			for (var i = 0; i < total; i++) {
				$body.append(
					'<h3><a href="' + reviews[i].author_url + '" target="_blank">' + reviews[i].author_name + '</a></h3>' +
					'<p>' + reviews[i].text + '</p>' +
					'<hr>'
				);
			}

		}, showErrorDialog);
	};

	/**
	 * Show modal with place share options
	 *
	 * @private
	 * @param {Object} place Place to show share options
	 */
	var showShareModal = function (place) {
		showLoadingModal(place);

		places.getDetails(place, function (details) {
			var $modal = $('#modal');

			$modal.find('.modal-title').text('Share ' + details.name);
			$modal.find('.modal-body').html(
				'<div class="text-center">' +
					'<a href="http://www.facebook.com/sharer.php?s=100&p[title]=' + encodeURIComponent(details.name) +
							'&p[url]=' + encodeURIComponent('http://fastlocalfood.com') +
							'&p[images][0]=' + encodeURIComponent(places.getPhoto(place)) + '" target="_blank">' +
						'<i class="icon-facebook-sign icon-4x"></i>' +
					'</a> ' +
					'<a href="https://twitter.com/intent/tweet?text=' + encodeURIComponent('I will go to ' + details.name) +
							'&url=' + encodeURIComponent('http://fastlocalfood.com') + '" target="_blank">' +
						'<i class="icon-twitter-sign icon-4x"></i>' +
					'</a> ' +
					'<a href="https://plus.google.com/share?url=' + encodeURIComponent('http://fastlocalfood.com') + '" target="_blank">' +
						'<i class="icon-google-plus-sign icon-4x"></i>' +
					'</a>' +
				'</div>'
			);
		}, showErrorDialog);
	};

	/**
	 * Show loading animation on modals
	 *
	 * @private
	 * @param {Object} place Place for modal
	 */
	var showLoadingModal = function (place) {
		var $modal = $('#modal');

		$modal.find('.modal-title').text(place.name);
		$modal.find('.modal-body').html(
			'<div class="text-center">' +
				'<i class="icon-refresh icon-spin icon-3x"></i>' +
			'</div>'
		);

	};

	/**
	 * Config a modal for a place
	 *
	 * @private
	 * @param {Object} details Details for a place
	 * @param {Object} $modal jQuery Object
	 * @param {Object} $body jQuery Object
	 */
	var configDialog = function (details, $modal, $body) {
		$modal.find('.modal-title').html(
			(details.icon ? '<img class="icon" src="' + details.icon + '">' : '') +
				details.name
		);
		$body.html('');
	};

	/**
	 * Show unexpected error on modals
	 *
	 * @private
	 */
	var showErrorDialog = function () {
		$('#modal').find('.modal-body').html('<div class="alert alert-danger">Unexpected error occurred, please try later</div>');
	};

	/**
	 * Show "Show More" Button
	 *
	 * @public
	 * @param {String} token Token for Google Place Api
	 */
	self.showMoreButton = function (token) {
		var $places = $('#places'),
			$lastRow = $places.find('.row:last'),
			total = $lastRow.find('.thumbnail').length;

		if (total === 3) {
			$places.append('<div class="row"></div> ');
			$lastRow = $places.find('.row:last');
		}

		$lastRow.append(
			'<div class="col-md-4 text-center morePlaces">' +
				'<a class="btn btn-default" id="morePlaces">Load More Places</a>' +
			'</div>'
		);
		$('#morePlaces').click(function () {
			$(this).parent().remove();

			// Scroll to the bottom of the page
			$('html, body').animate(
				{
					scrollTop: $(document).height()
				}
			);

			places.getMorePlaces();
		});
	};

	return self;
})();