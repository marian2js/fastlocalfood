<?php

require_once('../../classes/GooglePlaces.php');

// Get JSON from Google Places API
$gp = new GooglePlaces();
echo $gp->getDetails($_GET);