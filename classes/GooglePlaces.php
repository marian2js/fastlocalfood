<?php

class GooglePlaces {

	/**
	 * Private key from Goolge API
	 *
	 * @var string
	 */
	private $key = 'AIzaSyCTkgpwlijeqKTVaeGFd-jYchtbgJ-Qds8';

	/**
	 * Requests time out in seconds
	 *
	 * @var int
	 */
	private $timeOut = 120;

	/**
	 * Return JSON with nearby places
	 *
	 * @param $params
	 * @return {json}
	 */
	public function getNearbyPlaces ($params) {
		$apiUrl = $this->getApiUrl('https://maps.googleapis.com/maps/api/place/nearbysearch/json', $params);

		// Create curl request
		$curl = curl_init($apiUrl);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, $this->getTimeOut());
		curl_setopt($curl, CURLOPT_TIMEOUT, $this->getTimeOut());

		return curl_exec($curl);
	}

	/**
	 * Return Photo from Google Places API
	 *
	 * @param $params
	 * @return mixed
	 */
	public function getPhoto ($params) {
		$apiUrl = $this->getApiUrl('https://maps.googleapis.com/maps/api/place/photo', $params);

		// Create curl request
		$curl = curl_init($apiUrl);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
		curl_setopt($curl, CURLOPT_MAXREDIRS, 3);
		curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, $this->getTimeOut());
		curl_setopt($curl, CURLOPT_TIMEOUT, $this->getTimeOut());

		return curl_exec($curl);
	}

	/**
	 * Get JSON with details of a Place
	 *
	 * @param $params
	 * @return {json}
	 */
	public function getDetails ($params) {
		$apiUrl = $this->getApiUrl('https://maps.googleapis.com/maps/api/place/details/json', $params);

		// Create curl request
		$curl = curl_init($apiUrl);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, $this->getTimeOut());
		curl_setopt($curl, CURLOPT_TIMEOUT, $this->getTimeOut());

		return curl_exec($curl);
	}

	/**
	 * Generate url from Google Places API
	 *
	 * @param $url
	 * @param $params
	 * @return string
	 */
	private function getApiUrl ($url, $params) {
		$apiUrl = $url . '?key=' . $this->getKey();
		foreach ($params as $key => $value) {
			$apiUrl .= '&' . $key . '=' . $value;
		}

		return $apiUrl;
	}

	/**
	 * @param string $key
	 */
	public function setKey($key) {
		$this->key = $key;
	}

	/**
	 * @return string
	 */
	private  function getKey() {
		return $this->key;
	}

	/**
	 * @param int $timeOut
	 */
	public function setTimeOut($timeOut) {
		$this->timeOut = $timeOut;
	}

	/**
	 * @return int
	 */
	public function getTimeOut() {
		return $this->timeOut;
	}
}