import phaser from 'phaser/src/phaser.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var print = this.add.text(0, 0, '');

        var displaySize = this.scale.displaySize;
        var baseSize = this.scale.baseSize;
        var resolution = Math.max(displaySize.width / baseSize.width, 1);
        print.text = resolution

        var txt0 = this.add.text(130, 150, 'Hello xy world');
        var txt1 = this.add.text(130, 170, 'Hello xy world').setResolution(resolution);

        this.scale.on('resize', function (gameSize, baseSize, displaySize, previousWidth, previousHeight) {
            var resolution = Math.max(displaySize.width / baseSize.width, 1);
            txt1.setResolution(resolution);
            print.text = resolution
        }, this);
    }

    update() { }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 400,
    height: 300,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo
};

var game = new Phaser.Game(config);