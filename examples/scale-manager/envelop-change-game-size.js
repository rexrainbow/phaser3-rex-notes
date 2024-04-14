import phaser from 'phaser/src/phaser.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        var texture = this.textures.createCanvas('bg', 800, 800);
        var context = texture.getContext();

        context.fillStyle = "#808080";
        context.fillRect(0, 0, 800, 800);
        context.fillStyle = "#006400";
        context.fillRect(100, 100, 600, 600);

        texture.refresh();
    }

    create() {
        this.add.image(400, 400, 'bg');

        var rect = this.add.rectangle(0, 0, 0, 0).setOrigin(0).setStrokeStyle(10, 0xff0000);

        var printSize = this.add.text(200, 300, '');

        this.scale.on('resize', function (gameSize, baseSize, displaySize, previousWidth, previousHeight) {
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

            printSize.text = `${Math.floor(viewport.left)}x${Math.floor(viewport.top)}\n${Math.floor(viewport.right)}x${Math.floor(viewport.bottom)}`;
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
        mode: Phaser.Scale.ENVELOP,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo
};

var game = new Phaser.Game(config);