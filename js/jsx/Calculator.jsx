define(['react'], function(React) {
  var Field = React.createClass({
    fieldProps: {
      kids: {label: "Crianças", tabIndex: 1, help: "Menores de 12 anos", price: 8},
      adults: {label: "Adolescentes e Adultos", tabIndex: 2, help: "De 12 a 59 anos", price: 15},
      olds: {label: "Idosos", tabIndex: 3, help: "60 anos ou mais", price: 8}
    },

    render: function() {
      var name = this.props.name;
      var data = this.fieldProps[name];
      var value = (this.props.value === 0) ? "" : this.props.value;

      var that = this;
      var onChange = function(e) {
        var newValue = (e.target.value === "") ? 0 : parseInt(e.target.value, 10);
        that.props.onChange({target: that, newValue: newValue});
      };

      var decrement = function(e) {
        var nextValue = that.props.value - 1;
        if (nextValue < 0)
          nextValue = 0;
        that.props.onChange({target: that, newValue: nextValue});
      };

      var increment = function(e) {
        var nextValue = that.props.value + 1;
        that.props.onChange({target: that, newValue: nextValue});
      };

      var subTotal = that.props.value * data.price;
      if (subTotal === 0) {
        subTotal = "";
      } else {
        subTotal = " (R$ " + subTotal + ")";
      }

      return (
        <div className="form-group">
          <div className="col-xs-12">
            <label className="control-label" htmlFor={name}>{data.label}</label>
          </div>

          <div className="col-xs-8">
            <input className="form-control input-sm" type="text" tabIndex={data.tabIndex}
              name={name} value={value} onChange={onChange} />
          </div>
          <div className="incdec-buttons col-xs-4">
            <button type="button" className="btn btn-default btn-sm" onClick={increment}>
              <span className="glyphicon glyphicon-plus"></span>
            </button>
            <button type="button" className="btn btn-default btn-sm" onClick={decrement}>
              <span className="glyphicon glyphicon-minus"></span>
            </button>
          </div>

          <div className="col-xs-12">
            <p className="help-block">{data.help}{subTotal}</p>
          </div>
        </div>
      );
    }
  });

  var Calculator = React.createClass({
    getInitialState: function() {
      return {kids: 0, adults: 0, olds: 0};
    },

    render: function() {
      var that = this;
      var onChange = function(e) {
        var newState = {};
        newState[e.target.props.name] = e.newValue;
        that.setState(newState);
      };

      var cost = (this.state.kids + this.state.olds) * 8 + this.state.adults * 15;

      return (
        <div id="calculator" className="dark-bg shadow">
          <Field name="kids" value={that.state.kids} onChange={onChange} />
          <Field name="adults" value={that.state.adults} onChange={onChange} />
          <Field name="olds" value={that.state.olds} onChange={onChange} />
          <div>
            <div id="calculator-total-label" className="col-xs-4">Total</div>
            <div id="calculator-total" className="col-xs-8">R$ {cost}</div>
          </div>
        </div>
      );
    }
  });

  return Calculator;
});
