import phaser from 'phaser/src/phaser.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('portrait', 'assets/images/backgrounds/portrait.jpg');
    }

    create() {
        this.add.image(0, 0, 'portrait').setOrigin(0);

        var rect = this.add.rectangle(0, 0, 0, 0).setOrigin(0).setStrokeStyle(5, 0xff0000);

        this.scale.on('resize', function (gameSize, baseSize, displaySize, previousWidth, previousHeight) {
            var viewport = this.scale.getViewPort();
            rect
                .setPosition(viewport.x, viewport.y)
                .setSize(viewport.width, viewport.height)

        }, this);
    }

    update() { }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 640,
    height: 960,
    scale: {
        mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo
};

var game = new Phaser.Game(config);