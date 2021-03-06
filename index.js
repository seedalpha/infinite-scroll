/**
 * Infinite scrolling
 *
 * @ref https://github.com/alexblack/infinite-scroll
 */


/**
 * Helpers
 */

var isIE = /msie/gi.test(navigator.userAgent);


function getScrollPos(target) {
  if (target) {
    return target.scrollTop;
  } else if (isIE) { // Handle scroll position in case of IE differently
    return document.documentElement.scrollTop;
  } else {
    return window.pageYOffset;
  }
}


/**
 * Constructor
 *
 * @param {Object} options
 *   @param {Number} distance, distance to bottom
 *   @param {Function} callback(done)
 *   @param {DomElement} target, eg. a scrollable div
 */

function InfiniteScroll(options) {
  
  if (!(this instanceof InfiniteScroll)) {
    return new InfiniteScroll(options);
  }
  
  options.callback = options.callback || function() {};
  options.distance = options.distance || 50;
  
  var target = options.target || window;
  
  this.updateInitiated = false;
  this.prevScrollPos = getScrollPos(target);
  this.options = options;
  this.enabled = false;
  
  target.addEventListener('scroll',    this._onScroll.bind(this), false);
  target.addEventListener('touchmove', this._onScroll.bind(this), false);
}


/**
 * Scroll listener
 * 
 * @api private
 */

InfiniteScroll.prototype._onScroll = function(e) {
  if (!this.enabled) return;
  if (this.updateInitiated) return;

  var target = this.options.target;
  var scrollPos = getScrollPos(target);

  if (scrollPos === this.prevScrollPos) return;
  
  // Find the pageHeight and clientHeight(the no. of pixels to scroll to make the scrollbar reach max pos)
  // var pageHeight = document.documentElement.scrollHeight;
  var clientHeight = document.documentElement.clientHeight;
  
  var body = document.body;
  var html = document.documentElement;
  
  var pageHeight = Math.max(
    body.scrollHeight, 
    body.offsetHeight, 
    html.clientHeight, 
    html.scrollHeight, 
    html.offsetHeight
  );
  
  if (target) {
    clientHeight = target.clientHeight;
    pageHeight = target.scrollHeight;
  }
  
  // Check if scroll bar position is just `distance` above the max, if yes, initiate an update
  if (pageHeight - (scrollPos + clientHeight) < this.options.distance) {
    this.updateInitiated = true;
    
    this.options.callback(function() {
      this.updateInitiated = false;
    }.bind(this));
  }
  
  this.prevScrollPos = scrollPos;
}


/**
 * Enable scroll tracking
 */

InfiniteScroll.prototype.enable = function() {
  this.enabled = true;
}


/**
 * Disable scroll tracking
 */

InfiniteScroll.prototype.disable = function() {
  this.enabled = false;
}


/**
 * Expose 
 */

exports = module.exports = InfiniteScroll;