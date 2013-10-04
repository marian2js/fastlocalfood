<?php

require_once('../../classes/GooglePlaces.php');

// Get Image From Google Place API
header('Content-type: image/jpeg');
$gp = new GooglePlaces();
echo $gp->getPhoto($_GET);
