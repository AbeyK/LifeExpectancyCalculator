define('app',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);

      this.message = 'Hello World!';
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.title = "Life Expectancy Calculator";
      config.map([{ route: ['', 'personalinfo'], moduleId: 'personalinfo',
        name: 'personalinfo', title: 'Personal Info', nav: true }, { route: 'results', moduleId: 'results',
        name: 'results', title: 'Results', nav: true }]);
    };

    return App;
  }();
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('personalinfo',['exports', 'aurelia-fetch-client', 'aurelia-framework'], function (exports, _aureliaFetchClient, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.PersonalInfo = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var PersonalInfo = exports.PersonalInfo = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
        function PersonalInfo(http) {
            _classCallCheck(this, PersonalInfo);

            this.blah = "";
            this.httpClient = http;

            this.handleBodyClick = function (e) {
                console.log("ahh" + e.target);
            };
        }

        PersonalInfo.prototype.stuff = function stuff() {

            this.httpClient.fetch('https://maps.googleapis.com/maps/api/geocode/json?address=23139&key=AIzaSyBM9-m7L5132H_bDe3JUn9tlwblTARBRbQ').then(function (response) {
                return response.json();
            }).then(function (data) {
                console.log(data);
            });
        };

        PersonalInfo.prototype.attached = function attached() {
            document.getElementById("fname").onblur = function () {
                console.log("hello world");
            };
        };

        PersonalInfo.prototype.detached = function detached() {
            document.removeEventListener('click', this.handleBodyClick);
        };

        return PersonalInfo;
    }()) || _class);
});
define('results',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Results = exports.Results = function Results() {
        _classCallCheck(this, Results);
    };
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"styles.css\"></require><header class=\"main-header\">Life Expectancy Calculator</header><router-view></router-view><footer>©2017, PIEtech, Inc. All rights reserved.</footer></template>"; });
define('text!personalinfo.html', ['module'], function(module) { module.exports = "<template><require from=\"jquery-ui-dist/jquery-ui.css\"></require><header class=\"sub-header\"><h1>Personal Info</h1><p>Please answer these questions so we may better assess your planning age.</p></header><main><input type=\"text\" value.bind=\"this.blah\"><h2>${this.blah}</h2><form submit.trigger=\"stuff()\"><input type=\"text\" value.bind=\"this.blah\" id=\"fname\"><script>function myFunction(){alert(\"Input field lost focus.\")}document.getElementById(\"fname\").onblur=function(){myFunction()}</script><button type=\"submit\">Add Todo</button><div class=\"form-group\"><label show.bind=\"(userData.client.isMarried && !userData.client.isRecieving)\" for=\"spouseMilitaryService\">Do you recieve a government pension that is based on income?</label><label show.bind=\"userData.client.divorceCheck\" for=\"spouseMilitaryService\">Does your ex-spouse recieve a government pension that is based on income?</label><br><div click.delegate=\"gpoSpouse()\" class=\"btn-group\" data-toggle=\"buttons\"><label class=\"btn ${userData.spouse.recievePension ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!userData.spouse.recievePension ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div></div></form></main></template>"; });
define('text!results.html', ['module'], function(module) { module.exports = "<template><require from=\"jquery-ui-dist/jquery-ui.css\"></require><header class=\"sub-header\"><h1>Results</h1><p>“The following results are projections for educational and planning purposes only. We recommend that you consult with your financial advisor.”</p></header><main></main></template>"; });
define('text!styles.css', ['module'], function(module) { module.exports = ".main-header {\r\n    color: blue;\r\n    font-size: 250%;\r\n}\r\n\r\n.sub-header {\r\n\r\n}\r\n\r\nmain {\r\n    \r\n}"; });
//# sourceMappingURL=app-bundle.js.map