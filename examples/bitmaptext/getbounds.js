import 'phaser';
class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.bitmapFont('gothic', 'assets/fonts/gothic.png', 'assets/fonts/gothic.xml');
    }

    create() {
        polyfills();

        var txt = this.add.bitmapText(100, 100, 'gothic', 'HELLO');
        this.add.graphics({
            lineStyle: {
                color: 0xff0000,
                width: 2
            }
        })
            .strokeRectShape(txt.getBounds())
    }

    update(time) {
    }
}

var polyfills = function() {
    const Components = Phaser.GameObjects.Components;
    Phaser.Class.mixin(
        Phaser.GameObjects.BitmapText,
        [
            Components.ComputedSize,
            Components.GetBounds
        ]
    );
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