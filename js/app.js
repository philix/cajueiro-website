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

function buildImageSets(data) {
  var ret = {
    large: [],
    medium: [],
    small: []
  };

  var useImage = function(img, key) {
    if (img[key]) {
      img[key].src = '/uploads/backstretch/' + img[key].src;
      ret[key].push(img[key]);
    }
  };

  for (var i = 0; i < data.length; i += 1) {
    var img = data[i];
    useImage(img, 'large');
    useImage(img, 'medium');
    useImage(img, 'small');
  }

  return ret;
}

var backstretchImageSets = buildImageSets([
  // aerea
  {
    large: {
      src: 'aerea_large.jpg',
      width: 1600,
      height: 1066
    },
    medium: {
      src: 'area_medium.jpg',
      width: 1024,
      height: 862
    },
    small: {
      src: 'aerea_medium.jpg', // the small image has really bad quality
      width: 1024,
      height: 862
    }
  },
  // piscina_frente
  {
    large: { // same as medium
      src: 'piscina_frente_medium.jpg',
      width: 960,
      height: 539
    },
    medium: {
      src: 'piscina_frente_medium.jpg',
      width: 960,
      height: 539
    }
  },
  // toboagua
  {
    large: { // same as medium
      src: 'toboagua_medium.jpg',
      width: 960,
      height: 539
    },
    medium: {
      src: 'toboagua_medium.jpg',
      width: 960,
      height: 539
    }
  },
  // elefante
  {
    large: {
      src: 'elefante_large.jpg',
      width: 1600,
      height: 900
    },
    medium: {
      src: 'elefante_medium.jpg',
      width: 1024,
      height: 576
    },
    small: {
      src: 'elefante_small.jpg',
      width: 640,
      height: 420
    }
  },
  // piscina_fundo
  {
    large: {
      src: 'piscina_fundo.jpg',
      width: 960,
      height: 540
    },
    medium: {
      src: 'piscina_fundo.jpg',
      width: 960,
      height: 540
    },
    small: {
      src: 'piscina_fundo_small.jpg',
      width: 640,
      height: 360
    }
  },
  // piscina_fundo_kids
  {
    large: {
      src: 'piscina_fundo_kids_large.jpg',
      width: 1600,
      height: 900
    },
    medium: {
      src: 'piscina_fundo_kids_medium.jpg',
      width: 1024,
      height: 576
    },
    small: {
      src: 'piscina_fundo_kids_small.jpg',
      width: 640,
      height: 488
    }
  },
  // show
  {
    large: {
      src: 'show_large.jpg',
      width: 1600,
      height: 960
    },
    medium: {
      src: 'show_medium.jpg',
      width: 1024,
      height: 614
    },
    small: {
      src: 'show_small.jpg',
      width: 1600,
      height: 960
    }
  }/*,
  // overview (old aerial)
  {
    large: {
      src: 'overview.jpg',
      width: 960,
      height: 637
    },
    medium: {
      src: 'overview.jpg',
      width: 960,
      height: 637
    },
    small: {
      src: 'overview_small.jpg',
      width: 640,
      height: 425
    }
  }*/]);

  console.log(backstretchImageSets);

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
