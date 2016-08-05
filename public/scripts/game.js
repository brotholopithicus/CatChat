var mainState = {
    preload: function() {
        this.width = 1200;
        this.height = 700;
        game.load.spritesheet('kitty', 'assets/kitty.png', 500, 350);
        game.load.image('brick', 'assets/brick.png', 70, 70);
        game.load.spritesheet('lava', 'assets/lava.png', 702, 175);
        game.load.image('cave', 'assets/cave.png', 3000, 1100);
    },
    create: function() {
        // PHYSICS CONFIG
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // BACKGROUND CONFIG
        this.cave = game.add.tileSprite(0, 0, this.width, this.height, 'cave');

        // BRICK CONFIG
        this.bricks = game.add.group();


        // KITTY CONFIG
        this.kitty = game.add.sprite(50, 50, 'kitty');
        this.kitty.anchor.setTo(-0.2, 0.5);
        this.kitty.scale.setTo(0.15, 0.15);
        this.kitty.frame = 1;
        this.kitty.animations.add('run', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 10, true);

        // LAVA CONFIG
        this.lava = game.add.tileSprite(0, this.height - 100, this.width, this.height - 175, 'lava');
        this.lava.frame = 0;
        this.lava.animations.add('boil', [0, 1, 2, 3, 4, 5], 3, true);
        game.physics.arcade.enable(this.kitty);
        this.kitty.body.gravity.y = 1000;

        // INPUT
        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);

        // GAME TIMER
        this.timer = game.time.events.loop(2500, this.mainLoop, this);

        // SCORE
        this.score = 0;
        this.labelScore = game.add.text(20, 20, "0", {
            font: "30px Arial",
            fill: "#ffffff"
        });

    },
    update: function() {
        if (this.kitty.y < 0 || this.kitty.y > this.height) {
            this.restartGame();
        }
        if (this.kitty.angle < 20) {
            this.kitty.angle += 1;
        }
        this.kitty.animations.play('run');
        this.lava.animations.play('boil');

        game.physics.arcade.overlap(this.kitty, this.bricks, this.killKitty, null, this);
    },
    mainLoop: function() {
        console.log(this.kitty.bottom);
        this.addRowOfBricks();
    },
    jump: function() {
        if (!this.kitty.alive) {
            return;
        }
        var animation = game.add.tween(this.kitty);
        animation.to({
            angle: -20
        }, 100);
        animation.start();
        this.kitty.body.velocity.y = -350;
    },
    killKitty: function() {
        if (!this.kitty.alive) {
            return;
        }
        this.kitty.alive = false;
        game.time.events.remove(this.timer);
        this.bricks.forEach(function(brick) {
            brick.body.velocity.x = 0;
        }, this);
    },
    restartGame: function() {
        game.state.start('main');
    },
    addOneBrick: function(x, y) {
        var brick = game.add.sprite(x, y, 'brick');
        brick.scale.setTo(1, 1);
        brick.frame = 1;
        this.bricks.add(brick);
        game.physics.arcade.enable(brick);
        brick.body.velocity.x = -200;
        brick.checkWorldBounds = true;
        brick.outOfBoundsKill = true;
    },
    addRowOfBricks: function() {
        var numBricks = this.height / 70;
        var loc = numBricks / 2;
        var hole = Math.floor(Math.random() * loc) + 1;
        for (var i = 0; i < numBricks; i++) {
            if (i != hole && i != hole + 1 && i != hole + 2) {
                this.addOneBrick(this.width, i * 70);
            }
        }
        this.score += 1;
        this.labelScore.text = this.score;
    }
}

var menuState = {
    create: function() {
        var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.start, this);
        var style = {
            font: "44px Arial",
            fill: "#D76A62"
        };
        this.game.stage.backgroundColor = "#62B4D7";
        var x = game.world.width / 2;
        var y = game.world.height / 2;
        var text = this.game.add.text(x, y - 60, 'Press Space To Start!', style);
        text.anchor.setTo(0.5, 0.5);
    },
    start: function() {
        this.game.state.start('main');
    }
}
var game = new Phaser.Game(1200, 700, Phaser.AUTO, 'game');
game.state.add('main', mainState);
game.state.add('menu', menuState);
game.state.start('menu');
