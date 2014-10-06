// The MIT License (MIT)
//
// Copyright (c) 2014 Felipe O. Carvalho
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
define(['react'], function(React) {

  function expandAndPosition(w, h, boundingWidth, boundingHeight) {
    var newHeight, newWidth, top, left, factor;
    var ratio = w / h;
    var boundingRatio = boundingWidth / boundingHeight;

    if (ratio < boundingRatio) {
      factor = boundingWidth / w;
      newWidth = boundingWidth;
      newHeight = Math.floor(h * factor);
      left = 0;
      top = -Math.abs(newHeight - boundingHeight) / 2;
    } else {
      factor = boundingHeight / h;
      newWidth = Math.floor(w * factor);
      newHeight = boundingHeight;
      top = 0;
      left = -Math.abs(newWidth - boundingWidth) / 2;
    }

    return {height: newHeight, width: newWidth, top: top, left: left};
  }

  var BackStretch = React.createClass({
    getInitialState: function() {
      var $win = $(window);
      return {currentImage: 0, height: $win.height(), width: $win.width()};
    },

    updateDimensions: function() {
      var $win = $(window);
      this.setState({width: $win.width(), height: $win.height()});
    },

    getNextImageIndex: function() {
      return (this.state.currentImage + 1) % this.props.images.length;
    },

    preloadNextImage: function() {
      var nextImage = this.getNextImageIndex();
      console.log("Preloading " + nextImage);
      var img = document.createElement('img');
      img.src = this.props.images[nextImage].src;
    },

    componentWillMount: function() {
      this.updateDimensions();
    },

    componentDidMount: function() {
      window.addEventListener("resize", this.updateDimensions);

      this.preloadNextImage();

      var that = this;
      var refresh = function() {
        that.setState({currentImage: that.getNextImageIndex()});
        that.preloadNextImage();
      };
      this.interval = setInterval(refresh, 4000);
    },

    componentWillUnmount: function() {
      window.removeEventListener("resize", this.updateDimensions);
      clearInterval(this.interval);
    },

    render: function() {
      console.log("Rendering " + this.state.currentImage);
      var img = this.props.images[this.state.currentImage];

      var boundingHeight = Math.min(this.state.height - 45, 900);
      var boundingWidth = this.state.width;

      var imageStyle = expandAndPosition(img.width, img.height, boundingWidth, boundingHeight);

      return (
        <div id="backstretch" style={{height: boundingHeight}}>
          <div id="overlay">
            <img src="/imgs/overlay.png" width="373" height="220"/>
          </div>
          <img src={img.src} width={img.width} height={img.height} style={imageStyle} />
        </div>
      );
    }
  });

  return BackStretch;
});
