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

var backstretchImages = [
  '/uploads/backstretch/elefante.jpg',
  '/uploads/backstretch/show.jpg',
  '/uploads/backstretch/piscina_fundo.jpg'
];

require(['jquery',
         'react',
         'jsx!jsx/Calculator',
         'jsx!jsx/BackStretch',
         'libs/foundation/js/foundation'],
        function($, React, Calculator, BackStretch) {

  // Foundation JavaScript
  $(document).foundation();

  // Setup the Calculator
  var calcContainer = document.getElementById("js-calc-container");
  if (calcContainer) {
    // Mount the JSX component in the app container
    React.renderComponent(Calculator(), calcContainer);
  }
});
