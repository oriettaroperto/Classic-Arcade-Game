// Enemies our player must avoid
var Enemy = function (x, y, speed) {
  // Variables applied to each of our instances go here,
  this.x = x;
  this.y = y;
  this.speed = speed;

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += this.speed * dt;

  // Enemies reapear with random speeds
  if (this.x > 510) {
      this.x = -50;
      this.speed = 100 + Math.floor(Math.random() * 222);
  };

  //Checks if player collides with enemies
  if (player.x < this.x + 80 &&
      player.x + 80 > this.x &&
      player.y < this.y + 60 &&
      60 + player.y > this.y) {
      player.x = 202;
      player.y = 405;
    };
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y) {
  this.x = x;
  this.y = y;

  //Image of player is added from image folder.
  this.player = 'images/char-cat-girl.png';
};

Player.prototype.update = function (dt) {

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

//Function allow player to use arrow keys to move in the games.
Player.prototype.handleInput = function (keyPress) {
  if (keyPress == 'left' && this.x > 0) {
    this.x -= 102;
  };

  if (keyPress == 'right' && this.x < 405) {
    this.x += 102;
  };

  if (keyPress == 'up' && this.y > 0) {
    this.y -= 83;
  };

  if (keyPress == 'down' && this.y < 405) {
    this.y += 83;
  };

  // Resets player to starting point after winning.
  if (this.y < 0) {
    setTimeout(() => {
      this.x = 202;
      this.y = 405;
    }, 700);
  };
};

// All enemies are placed in an array.
var allEnemies = [];

// Location of Enemies on y axis.
var enemyLocation = [63, 147, 230];

// Speed of enemies starts at 200 on x axis,
// then it increases randomly.
enemyLocation.forEach(function (locationY) {
  enemy = new Enemy(0, locationY, 200);
  allEnemies.push(enemy);
});

// Starting location of player.
var player = new Player(202, 405);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
