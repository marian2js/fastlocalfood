Fast Local Food
=============

[Fast Local Food](http://fastlocalfood.com) is a site to find nearby places to eat.


### Technologies and libraries used:

  * [Google Maps API v3](https://developers.google.com/maps/documentation/javascript/) and [Google Places API](https://developers.google.com/places/).

  * [PHP](http://php.net/) - to get responses from Google Maps API and Places API.

  * [jQuery](http://jquery.com/) - to simplify the client-side scripting of HTML.

  * [jQueryUI](http://jqueryui.com/) and [CSS 3](http://en.wikipedia.org/wiki/CSS3) - to manage web effects.

  * [Twitter Bootstrap v3](http://getbootstrap.com) - to simplify web design and responsive.

  * [Font Awesome](http://fortawesome.github.io/Font-Awesome/) - collection of icons for bootstrap.

  * [LESS](http://lesscss.org/) - to accelerate the development and maintenance of CSS.

  * [YO](http://yeoman.io/) - to scaffolds out the site.

  * [Grunt](http://gruntjs.com/) - to build, preview and test the project.

  * [Bower](http://bower.io/) - used for dependency management.


### Getting Started:

First of all, you need to install [Node.js](http://nodejs.org/).

Then install [Yeoman](http://yeoman.io/) (includes yo, grunt and bower).

```shell
npm install -g yo
```

Once you have installed dependences, run following commands:

```shell
git clone https://github.com/mytwm/fastlocalfood.git fastlocalfood
cd fastlocalfood/
bower update # Download front-end dependences
npm install # Download dependences to build a test site
grunt test # Run all tests
grunt build # Build the site
```

