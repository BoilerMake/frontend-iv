#BoilerMake Website [frontend]

###getting up and running:
* install npm
* run `npm install -g gulp bower`
* run `npm install` to install the gulp thingies
* run `bower install` to update the css + js external assets
* copy `src/app/config.example.js` into `src/app/config.js` and enter in the url running the backend (remember to add `v1` in there!)
* make sure you have the [backend](https://github.com/BoilerMake/backend) running
* run `gulp serve` to serve the site :)
* if it yells at you about node sass do [this](http://stackoverflow.com/questions/29461831/libsass-bindings-not-found-when-using-node-sass-in-nodejs#answer-32946197)
