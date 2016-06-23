'use strict';

angular.module('BlurAdmin', []);
angular.module('Simulator', [
  'ngAnimate',
  'ngCookies',
  'restangular',
  'ui.bootstrap',
  'ui.sortable',
  'ui.router',
  'ngTouch',
  'toastr',
  'smart-table',
  "xeditable",
  'ui.slimscroll',
  'ngJsTree',
  'angular-progress-button-styles',

  'BlurAdmin.theme',
  //'BlurAdmin.pages',
  'Simulator.core',
  'Simulator.pages',
  'Simulator.components',
  //'Simulator.services'
]);