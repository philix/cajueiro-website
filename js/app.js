require.config({
  baseUrl: "js/",

  paths: {
    "jquery": "libs/jquery/dist/jquery",
    "text": "jsx-requirejs-plugin/js/text",
    "react": "jsx-requirejs-plugin/js/react-with-addons-0.11.1",
    "JSXTransformer": "jsx-requirejs-plugin/js/JSXTransformer-0.11.1"
  },

  shim: {
    "libs/modernizr/modernizr": {
      exports: 'Modernizr',
    },
    "libs/foundation/js/foundation": {
      deps: ['jquery', 'libs/modernizr/modernizr']
    }
  },

  jsx: {
    fileExtension: '.jsx'
  }
});

var backstretchImageSets = {
  large: [
    {
      src: '/uploads/backstretch/elefante_large.jpg',
      width: 1600,
      height: 900
    },
    {
      src: '/uploads/backstretch/piscina_fundo.jpg',
      width: 960,
      height: 540
    },
    {
      src: '/uploads/backstretch/piscina_fundo_kids_large.jpg',
      width: 1600,
      height: 900
    },
    {
      src: '/uploads/backstretch/show_large.jpg',
      width: 1600,
      height: 960
    },
    {
      src: '/uploads/backstretch/overview.jpg',
      width: 960,
      height: 637
    }
  ],
  medium: [
    {
      src: '/uploads/backstretch/elefante_medium.jpg',
      width: 1024,
      height: 576
    },
    {
      src: '/uploads/backstretch/piscina_fundo.jpg',
      width: 960,
      height: 540
    },
    {
      src: '/uploads/backstretch/piscina_fundo_kids_medium.jpg',
      width: 1024,
      height: 576
    },
    {
      src: '/uploads/backstretch/show_medium.jpg',
      width: 1024,
      height: 614
    },
    {
      src: '/uploads/backstretch/overview.jpg',
      width: 960,
      height: 637
    }
  ],
  small: [
    {
      src: '/uploads/backstretch/elefante_small.jpg',
      width: 640,
      height: 420
    },
    {
      src: '/uploads/backstretch/piscina_fundo_small.jpg',
      width: 640,
      height: 360
    },
    {
      src: '/uploads/backstretch/piscina_fundo_kids_small.jpg',
      width: 640,
      height: 488
    },
    {
      src: '/uploads/backstretch/show_small.jpg',
      width: 1600,
      height: 960
    },
    {
      src: '/uploads/backstretch/overview_small.jpg',
      width: 640,
      height: 425
    }
  ]
};

require(['jquery',
         'react',
         'jsx!jsx/Calculator',
         'jsx!jsx/BackStretch',
         'jsx!jsx/Weather',
         'libs/foundation/js/foundation'],
        function($, React, Calculator, BackStretch, Weather) {

  // Foundation JavaScript
  $(document).foundation();

  // Setup the Calculator
  var calcContainer = document.getElementById("js-calc-container");
  if (calcContainer) {
    React.renderComponent(Calculator(), calcContainer);
  }

  var bsContainer = document.getElementById("js-backstretch-container");
  if (bsContainer) {
    var width = $(window).width();
    var sizeGroup = 'small';
    if (width > 1024) {
      sizeGroup = 'large';
    } else if (width > 640) {
      sizeGroup = 'medium';
    }
    React.renderComponent(BackStretch({images: backstretchImageSets[sizeGroup]}), bsContainer);
  }

  var weatherContainer = document.getElementById("js-weather-container");
  if (weatherContainer) {
    var weatherUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=-10.647222&lon=-37.373472&units=metric&lang=pt&cnt=3";
    $.getJSON(weatherUrl, function (data) {
      console.log(data);
      React.renderComponent(Weather({data: data}), weatherContainer);
    });
  }
});
