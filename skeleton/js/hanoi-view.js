var View = function (game, $el) {
  this.game = game;
  this.$el = $el;
  this.numSquares = 0;
  this.setupBoard();
  this.clickTower();
  this.clickNumber = 0;
  this.from = 0;
  this.to = 0;
};

View.prototype.makeMove = function (e) {
  var pos = $(e.currentTarget).data("id");

  if (this.clickNumber === 1) {
    this.to = pos;
    this.game.move(this.from, this.to);
    this.clickNumber = 0;
    $(".square").eq(this.from).removeClass();
    this.render();
  }
  else {
    this.from = pos;
    this.clickNumber = 1;

  }

};

View.prototype.clickTower = function () {
  // this.$el.on("mouseup", ".square", this.makeMove.bind(this));
  this.$el.on("click", ".tower", this.makeMove.bind(this));

};

View.prototype.render = function () {
  var counter = 0;
  var that = this;
  this.game.towers.forEach(function(el) {
    for (var j = 2; j > -1; j--) {
      var d = el[j];
      var discs = $(".square").eq(counter);
      if (d > 0){
        discs.addClass(DISCS[d]);
      } else {
        // discs.removeClass();
      }
      counter++;
    }
  });
};

var DISCS ={
  1 : "disc-1",
  2 : "disc-2",
  3 : "disc-3"
};

View.prototype.setupBoard = function () {
  for (var i = 0; i < 3; i++) {
    this.addTower();
  }
  this.render();
};

View.prototype.addTower = function () {
  var towerIdx = this.$el.find(".tower").length;
  var $tower = $("<ul>").addClass('tower').data('id', towerIdx);
  for (var colIdx = 0; colIdx < 3; colIdx++) {
    var $square = $("<li>").addClass('square').data('pos', [towerIdx, colIdx]);
    this.numSquares += 1;
    $tower.append($square);
  }
  this.$el.append($tower);

};

module.exports = View;
