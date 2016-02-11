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
