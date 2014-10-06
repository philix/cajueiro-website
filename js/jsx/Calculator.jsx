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
define(['react', 'jsx!jsx/Row'], function(React, Row) {
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
        <form>
          <Row>
            <div className="small-12 column">
              <label className="control-label" htmlFor={name}>{data.label}</label>
            </div>
            <Row className="collapse">
              <div className="small-8 column">
                <input className="form-control input-sm" type="text" tabIndex={data.tabIndex}
                  name={name} value={value} onChange={onChange} />
              </div>
              <div className="small-2 column">
                <a className="button postfix" onClick={increment}>&#43;</a>
              </div>
              <div className="small-2 column">
                <a className="button postfix" onClick={decrement}>&minus;</a>
              </div>
            </Row>
          </Row>

          <Row>
            <div className="small-12 column">
              <p className="help-block">{data.help}{subTotal}</p>
            </div>
          </Row>
        </form>
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
        <div id="calculator">
          <div className="row">
            <div className="small-12 column">
              <Field name="kids" value={that.state.kids} onChange={onChange} />
              <Field name="adults" value={that.state.adults} onChange={onChange} />
              <Field name="olds" value={that.state.olds} onChange={onChange} />
              <Row>
                <div id="calculator-total-label" className="small-4 column">Total</div>
                <div id="calculator-total" className="small-8 column">R$ {cost}</div>
              </Row>
            </div>
          </div>
        </div>
      );
    }
  });

  return Calculator;
});
