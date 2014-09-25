define(['react'], function(React) {
  var Row = React.createClass({
    render: function() {
      var props = this.props;
      props.className = (props.className || "") + " row";
      return React.DOM.div(props, this.props.children);
    }
  });

  return Row;
});
