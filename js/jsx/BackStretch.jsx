define(['react'], function(React) {

  function expandAndPosition(w, h, boundingWidth, boundingHeight) {
    var newHeight, newWidth, top, left, factor;
    var ratio = w / h;
    var boundingRatio = boundingWidth / boundingHeight;

    if (ratio < boundingRatio) {
      console.log("<");
      factor = boundingWidth / w;
      newWidth = boundingWidth;
      newHeight = Math.floor(h * factor);
      left = 0;
      top = -Math.abs(newHeight - boundingHeight) / 2;
    } else {
      console.log(">");
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

    componentWillMount: function() {
      this.updateDimensions();
    },

    componentDidMount: function() {
      window.addEventListener("resize", this.updateDimensions);
    },

    componentWillUnmount: function() {
      window.removeEventListener("resize", this.updateDimensions);
    },

    render: function() {
      var currentImage = this.state.currentImage % this.props.images.length;
      var img = this.props.images[currentImage];

      var boundingHeight = Math.min(this.state.height - 45, 900);
      var boundingWidth = this.state.width;

      var imageStyle = expandAndPosition(img.width, img.height, boundingWidth, boundingHeight);

      console.log(imageStyle);

      return (
        <div id="backstretch" style={{height: boundingHeight}}>
          <div id="overlay">
            <img src="/imgs/overlay.png" width="367" height="200"/>
          </div>
          <img src={img.src} width={img.width} height={img.height} style={imageStyle} />
        </div>
      );
    }
  });

  return BackStretch;
});
