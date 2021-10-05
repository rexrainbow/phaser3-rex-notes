import 'phaser';
class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        this.add.rectangle(0, 0, 768, 1334).setStrokeStyle(10, 0xff0000).setOrigin(0)

        var gameConfig = this.game.config;
        var aspectRatio = (gameConfig.height === 0) ? 1 : gameConfig.width / gameConfig.height;
        var gameCenterX = gameConfig.width / 2,
            gameCenterY = gameConfig.height / 2;
        this.scale.on('resize',
            function (gameSize, baseSize, displaySize, previousWidth, previousHeight) {
                var cameraRatio = (aspectRatio > 1) ? (displaySize.width / gameConfig.width) : (displaySize.height / gameConfig.height);
                var displayCentetX = displaySize.width / 2,
                    displayCentetY = displaySize.height / 2;
                this.cameras.main
                    .setScroll(gameCenterX - displayCentetX, gameCenterY - displayCentetY)
                    .setZoom(cameraRatio)
            },
            this
        );

    }

}

var config = {
    type: Phaser.AUTO,
    parent: 'main',
    width: 768,
    height: 1334,
    scene: Demo,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.NO_CENTER
    },
};

var game = new Phaser.Game(config);