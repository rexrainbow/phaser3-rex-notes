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
        for (var i = 0; i < 20; i++) {
            // let gameObject = this.add.container(0, 0, [
            //     this.add.image(0, 0, 'mushroom')
            // ])
            //     .setSize(64, 64)
            //     .setRandomPosition(100, 100, 600, 400)

            let gameObject = this.add.image(0, 0, 'mushroom')
                .setRandomPosition(100, 100, 600, 400)

            gameObject
                .setInteractive()
                .on('pointerover', function () {
                    gameObject._glowFilter = gameObject
                        .enableFilters()
                        .filters.internal.addGlow()
                }, this)
                .on('pointerout', function () {
                    if (gameObject._glowFilter) {
                        gameObject.filters.internal.remove(gameObject._glowFilter);
                        gameObject._glowFilter = null;
                    }
                }, this)

        }
    }

    update() {
    }
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