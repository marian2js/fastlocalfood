/**
 *
 */
var app = (function () {
	var self = {};

	/**
	 * Show error message
	 *
	 * @public
	 * @param {string} error Error to show
	 */
	self.setError = function (error) {
		var $msgError = $('#msg-error');

		$msgError.text(error);
		$msgError.show('highlight', 1500);
	};

	/**
	 * Show loading animation
	 *
	 * @public
	 */
	self.startLoading = function () {
		$('#loading').fadeIn();
	};

	/**
	 * Hide loading animation
	 *
	 * @public
	 */
	self.stopLoading = function () {
		$('#loading').fadeOut();
	};

	/**
	 * Get default photo for places
	 *
	 * @public
	 * @returns {string}
	 */
	self.getDefaultPhoto = function () {
		return '/images/photo.jpg';
	};

	return self;
})();