/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var View = __webpack_require__(1);
	var HanoiGame = __webpack_require__(2);
	
	$(function () {
	  var rootEl = $('.hanoi');
	  var game = new HanoiGame();
	  new View(game,rootEl);
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	var View = function (game, $el) {
	  this.game = game;
	  this.$el = $el;
	  this.numSquares = 0;
	  this.setupBoard();
	  this.$el.on(
	    "click",
	    "ul",
	    this.clickTower.bind(this)
	  );
	
	  this.fromTowerIdx = null;
	  this.render();
	  // this.from = null;
	  // this.to = 0;
	};
	
	// View.prototype.makeMove = function (e) {
	//   var pos = $(e.currentTarget).data("id");
	//
	//   if (this.clickNumber === 1) {
	//     this.to = pos;
	//     this.game.move(this.from, this.to);
	//     this.clickNumber = 0;
	//     $(".square").eq(this.from).removeClass();
	//     this.render();
	//   }
	//   else {
	//     this.from = pos;
	//     this.clickNumber = 1;
	//
	//   }
	//
	// };
	
	View.prototype.clickTower = function (e) {
	  // this.$el.on("mouseup", ".square", this.makeMove.bind(this));
	  // this.$el.on("click", ".tower", this.makeMove.bind(this));
	  var clickedTowerIdx = $(e.currentTarget).index();
	
	  if (this.fromTowerIdx === null) {
	    this.fromTowerIdx = clickedTowerIdx;
	  } else {
	    if (!this.game.move(this.fromTowerIdx, clickedTowerIdx)) {
	      alert("Invalid Move! Try again.");
	    }
	
	    this.fromTowerIdx = null;
	  }
	
	  this.render();
	
	  if (this.game.isWon()) {
	    // Remove click handler when done.
	    this.$el.off("click");
	    this.$el.addClass("game-over");
	    alert("Good work, you!");
	  }
	
	};
	
	// View.prototype.render = function () {
	//   var counter = 0;
	//   this.game.towers.forEach(function(el) {
	//     for (var j = 2; j > -1; j--) {
	//       var d = el[j];
	//       var discs = $(".square").eq(counter);
	//       if (d > 0){
	//         discs.addClass(DISCS[d]);
	//       } else {
	//         // discs.removeClass();
	//       }
	//       counter++;
	//     }
	//   });
	// };
	
	
	
	View.prototype.setupBoard = function () {
	  // for (var i = 0; i < 3; i++) {
	  //   this.addTower();
	  // }
	  // this.render();
	
	  this.$el.empty();
	  this.$el.addClass("group");
	
	  var $tower, $disc;
	
	  for (var towerIdx = 0; towerIdx < 3; towerIdx++) {
	    $tower = $("<ul>");
	
	    for (var discIdx = 0; discIdx < 3; discIdx++) {
	      $disc = $("<li>");
	      $tower.append($disc);
	    }
	
	    this.$el.append($tower);
	  }
	
	  this.render();
	};
	
	View.prototype.render = function () {
	
	  var $towers = this.$el.find("ul");
	  $towers.removeClass();
	
	  if (this.from !== null) {
	    $towers.eq(this.fromTowerIdx).addClass("selected");
	  }
	
	  this.game.towers.forEach(function(discs, towerIdx){
	    var $discs = $towers.eq(towerIdx).children();
	    $discs.removeClass();
	
	    discs.forEach(function(discWidth, discIdx) {
	
	      $discs.eq(-1 * (discIdx + 1)).addClass("disc-" + discWidth);
	    });
	  });
	};
	  // var towerIdx = this.$el.find(".tower").length;
	  // var $tower = $("<ul>").addClass('tower').data('id', towerIdx);
	  // for (var colIdx = 0; colIdx < 3; colIdx++) {
	  //   var $square = $("<li>").addClass('square').data('pos',
	  // [towerIdx, colIdx]);
	  //   this.numSquares += 1;
	  //   $tower.append($square);
	  // }
	  // this.$el.append($tower);
	
	module.exports = View;


/***/ },
/* 2 */
/***/ function(module, exports) {

	function Game () {
	  this.towers = [[3, 2, 1], [], []];
	};
	
	Game.prototype.isValidMove = function (startTowerIdx, endTowerIdx) {
	  var startTower = this.towers[startTowerIdx];
	  var endTower = this.towers[endTowerIdx];
	
	  if (startTower.length === 0) {
	    return false;
	  } else if (endTower.length == 0) {
	    return true;
	  } else {
	    var topStartDisc = startTower[startTower.length - 1];
	    var topEndDisc = endTower[endTower.length - 1];
	    return topStartDisc < topEndDisc;
	  }
	};
	
	Game.prototype.isWon = function () {
	  // move all the discs to the last or second tower
	  return (this.towers[2].length == 3) || (this.towers[1].length == 3);
	};
	
	Game.prototype.move = function (startTowerIdx, endTowerIdx) {
	  if (this.isValidMove(startTowerIdx, endTowerIdx)) {
	    this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
	    return true;
	  } else {
	    return false;
	  }
	};
	
	Game.prototype.print = function () {
	  console.log(JSON.stringify(this.towers));
	};
	
	Game.prototype.promptMove = function (reader, callback) {
	  this.print();
	  reader.question("Enter a starting tower: ", function (start) {
	    var startTowerIdx = parseInt(start);
	    reader.question("Enter an ending tower: ", function (end) {
	      var endTowerIdx = parseInt(end);
	      callback(startTowerIdx, endTowerIdx)
	    });
	  });
	};
	
	Game.prototype.run = function (reader, gameCompletionCallback) {
	  this.promptMove(reader, (function (startTowerIdx, endTowerIdx) {
	    if (!this.move(startTowerIdx, endTowerIdx)) {
	      console.log("Invalid move!");
	    }
	
	    if (!this.isWon()) {
	      // Continue to play!
	      this.run(reader, gameCompletionCallback);
	    } else {
	      this.print();
	      console.log("You win!");
	      gameCompletionCallback();
	    }
	  }).bind(this));
	};
	
	module.exports = Game;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map