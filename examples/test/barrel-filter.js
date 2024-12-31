import phaser from '../../../phaser/src/phaser.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('mushroom', 'assets/images/mushroom.png');
    }

    create() {
        var gameObject = this.add.image(400, 300, 'mushroom')
        AddInputEvent(gameObject)

        var gameObject = this.add.image(281.56996822774255, 248.81444391057582, 'mushroom')
        AddInputEvent(gameObject)
    }

    update() {
    }
}

var AddInputEvent = function (gameObject) {
    gameObject
        .setInteractive()
        .on('pointerover', function () {
            if (gameObject._barrelFilter) {
                gameObject._barrelFilter.setActive(true);
            } else {
                gameObject._barrelFilter = gameObject
                    .enableFilters()
                    .filters.internal.addBarrel(1.5)
            }
            console.log(gameObject.x, gameObject.y)
        }, this)
        .on('pointerout', function () {
            if (gameObject._barrelFilter) {
                gameObject._barrelFilter.setActive(false);
            }
        }, this)
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    backgroundColor: 0x555555,
    scene: Demo,
};

var game = new Phaser.Game(config);