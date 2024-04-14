import phaser from 'phaser/src/phaser.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
    }

    create() {
        this.add.image(0, 0, 'classroom').setAlpha(0.5).setOrigin(0);

        var rect = this.add.rectangle(0, 0, 0, 0).setOrigin(0).setStrokeStyle(5, 0xff0000);

        var printSize = this.add.text(200, 300, '');

        this.scale.on('resize', function (gameSize, baseSize, displaySize, previousWidth, previousHeight) {
            printSize.text = `${gameSize.width}x${gameSize.height}`;

            var parentSize = this.scale.parentSize;
            var isParentSizeLandscape = parentSize.width > parentSize.height;
            var isGameSizeLandscape = gameSize.width > gameSize.height;
            if (isParentSizeLandscape != isGameSizeLandscape) {
                this.scale.setGameSize(gameSize.height, gameSize.width);
                this.scale.refresh();
                return;
            }

            var viewport = this.scale.getViewPort();
            rect
                .setPosition(viewport.x, viewport.y)
                .setSize(viewport.width, viewport.height)

        }, this);

        this.scale.refresh();
    }

    update() { }
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
    scene: Demo
};

var game = new Phaser.Game(config);