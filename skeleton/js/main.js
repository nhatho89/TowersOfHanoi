var View = require('./hanoi-view');
var HanoiGame = require('../../hanoi-core-solution/game.js');

$(function () {
  var rootEl = $('.hanoi');
  var game = new HanoiGame();
  new View(game,rootEl);
});
