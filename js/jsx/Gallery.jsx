define(['react'], function(React) {
  var ImageBox = React.createClass({
    getInitialState: function() {
      var len = this.props.images.length;
      var current = this.props.images.indexOf(this.props.currentImage);
      return {
        previous: (current - 1) % len,
        current: current,
        next: (current + 1) % len
      };
    },

    _preload: function(i) {
      var preloader = new Image();
      preloader.src = this.props.images[i];
    },

    goToPrevious: function(e) {
      var len = this.props.images.length;
      var current = this.state.current;
      this.setState({
        previous: (current + len - 2) % len,
        current: (current + len - 1) % len,
        next: current,
      });
      this._preload(this.state.previous);
      e.preventDefault();
    },

    goToNext: function(e) {
      var len = this.props.images.length;
      var current = this.state.current;
      this.setState({
        previous: current,
        current: (current + 1) % len,
        next: (current + 2) % len
      });
      this._preload(this.state.next);
      e.preventDefault();
    },

    select: function(imageUrl) {
      var len = this.props.images.length;
      var current = this.props.images.indexOf(imageUrl);
      this.setState({
        previous: (current - 1) % len,
        current: current,
        next: (current + 1) % len
      });
      this._preload(this.state.next);
    },

    _handleKeyDown: function(e) {
      if (e.keyCode === 39) { // ->
        this.goToNext(e);
      }
      if (e.keyCode === 37) { // <-
        this.goToPrevious(e);
      }
    },

    componentDidMount: function() {
      window.addEventListener("keydown", this._handleKeyDown);
    },

    componentWillUnmount: function() {
      window.removeEventListener("keydown", this._handleKeyDown);
    },

    render: function() {
      var containerStyle = {
        "min-height": "563px",
        "margin-bottom": "30px",
        "background-color": "#190C05",
        padding: "5px",
        "text-align": "center",
        display: "block",
        position: "relative"
      };

      var previousUrl = this.props.images[this.state.previous];
      var currentUrl = this.props.images[this.state.current];
      var nextUrl = this.props.images[this.state.next];

      return (
        <div style={containerStyle}>
          <div className="lb-nav">
            <a className="lb-prev" href={previousUrl} onClick={this.goToPrevious}/>
            <a className="lb-next" href={nextUrl} onClick={this.goToNext}/>
          </div>
          <img src={currentUrl} />
        </div>
      );
    }
  });

  var Thumb =  React.createClass({
    render: function() {
      var width = '150px';
      var height = '150px';
      var style = {
        width: width,
        height: height,
        display: 'inline-block',
        marginRight: '10px',
        marginBottom: '10px',
        overflow: 'hidden',
        position: 'relative',
        'verticalAlign': 'top',
      };

      var that = this;
      var handleClick = function(e) {
        that.props.onSelect(that.props.href);
        e.preventDefault();
      };

      return (
        <div style={style}>
          <a href={this.props.href} onClick={handleClick}>
            <img src={this.props.thumb} />
          </a>
        </div>
      );
    }
  });

  var Gallery = React.createClass({
    render: function() {
      var that = this;
      var selectThumbCb = function(imageUrl) {
        that.refs.box.select(imageUrl);
        that.refs.box.getDOMNode().scrollIntoView();
      };

      var images = this.props.images;
      var thumbs = this.props.thumbs;

      return (
        <div>
          <ImageBox ref="box" images={images} currentImage={images[0]} />
          {
            React.Children.map(thumbs, function(child, i) {
              return (
                <Thumb onSelect={selectThumbCb} href={images[i]} thumb={thumbs[i]} />
              );
            })
          }
        </div>
      );
    }
  });

  return Gallery;
});
