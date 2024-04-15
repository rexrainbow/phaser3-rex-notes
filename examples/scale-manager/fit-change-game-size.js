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
            var parentSize = this.scale.parentSize;
            if ((parentSize.width > parentSize.height) != (gameSize.width > gameSize.height)) {
                this.scale.setGameSize(gameSize.height, gameSize.width);
                // Will fire this event again

            } else {
                var viewport = this.scale.getViewPort();
                rect
                    .setPosition(viewport.x, viewport.y)
                    .setSize(viewport.width, viewport.height)

                printSize.text = `${Math.floor(viewport.left)}x${Math.floor(viewport.top)}\n${Math.floor(viewport.right)}x${Math.floor(viewport.bottom)}`;
            }

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