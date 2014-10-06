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
  var daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  var hourOffset = -3;
  var timeOffset = hourOffset * 3600 * 1000;
  var aDay = 24 * 3600 * 1000;

  function getDayCountFromTime(time) {
    return Math.floor((time + timeOffset) / aDay);
  }

  // http://api.openweathermap.org/data/2.5/forecast?lat=-10.647222&lon=-37.373472&units=metric&lang=pt&cnt=3
  // http://api.openweathermap.org/data/2.5/weather?lat=-10.647222&lon=-37.373472&units=metric&lang=pt
  var Weather = React.createClass({

    render: function() {
      var list = this.props.data.list;
      var now = list[0];
      var temp = Math.round(now.main.temp);
      var tempMax = Math.round(now.main.temp_max);
      var tempMin = Math.round(now.main.temp_min);
      var humidity = now.main.humidity;
      var wind = Math.round(now.wind.speed);
      var desc = now.weather[0].description;

      var today = getDayCountFromTime(Date.now());

      var tempForecast = [], nextDay = 0;
      for (var i = 0; i < list.length && tempForecast.length < 3; i += 1) {
        var dateText = list[i].dt_txt;
        var p = dateText.replace(/[ :]/g, '-').split('-');
        for (var j = 0; j < p.length; j += 1) {
          p[j] = parseInt(p[j], 10);
        }
        var date = new Date(p[0], p[1] - 1, p[2], p[3], p[4], p[5]);
        var hour = date.getHours();
        if (hour < 14 || hour > 17) {
          continue;
        }
        var dayCount = getDayCountFromTime(date.getTime());
        if (dayCount === today + tempForecast.length + 1) {
          var dayOfWeek = daysOfWeek[date.getDay()];
          tempForecast.push({day: dayOfWeek, temp: Math.round(list[i].main.temp)});
        }
      }

      return (
        <div className="weather-wrap">
          <div className="weather-cover">
            <div className="weather-darken">
              <div className="weather-header">Balneário Cajueiro</div>

              <Row>
                <div className="small-4 column">
                  <div className="weather-current-temp">
                    {temp}<sup>C</sup>
                  </div>
                </div>

                <div className="small-8 column">
                  <div className="weather-todays-stats">
                    <div>{desc}</div>
                    <div>umidade: {humidity}%</div>
                    <div>vento: {wind} Kmh</div>
                    <div>Máx {tempMax} • Mín {tempMin}</div>
                  </div>
                </div>
              </Row>

              <div className="weather-forecast">
                <Row>
                  <div className="small-4 column">
                    <div className="weather-forecast-day">
                      <div className="weather-forecast-day-temp">{tempForecast[0].temp}<sup>C</sup></div>
                      <div className="weather-forecast-day-abbr">{tempForecast[0].day}</div>
                    </div>
                  </div>

                  <div className="small-4 column">
                    <div className="weather-forecast-day">
                      <div className="weather-forecast-day-temp">{tempForecast[1].temp}<sup>C</sup></div>
                      <div className="weather-forecast-day-abbr">{tempForecast[1].day}</div>
                    </div>
                  </div>

                  <div className="small-4 column">
                    <div className="weather-forecast-day">
                      <div className="weather-forecast-day-temp">{tempForecast[2].temp}<sup>C</sup></div>
                      <div className="weather-forecast-day-abbr">{tempForecast[2].day}</div>
                    </div>
                  </div>
                </Row>
              </div>
            </div>
          </div>
        </div>
      );
    }
  });

  return Weather;
});
