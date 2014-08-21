# InfiniteScroll

- No dependencies
- Tested in Chrome 17, IE7, Firefox 11, Android 2.3 Browser, iPad 2 with IOS5
- Handles touch events to respond before the end of the user's scroll on devices like the iPad

## Usage
``` js

var InfiniteScroll = require('infinite-scroll');

var options = {
  distance: 50,
  callback: function(done) {
    // 1. fetch data from the server
    // 2. insert it into the document
    // 3. call done when we are done
    done();
  }
}
    
// setup infinite scroll
var sensor = InfiniteScroll(options);

sensor.enable();

```
