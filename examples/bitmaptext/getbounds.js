class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('knighthawks', 'assets/fonts/knighthawks-font-filled.png');
    }

    create() {
        polyfills();

        var config = {
            image: 'knighthawks',
            width: 31,
            height: 24,
            chars: Phaser.GameObjects.RetroFont.TEXT_SET2,
            charsPerRow: 10,
            spacing: {
                x: 1,
                y: 1
            }
        };
        this.cache.bitmapFont.add('knighthawks', Phaser.GameObjects.RetroFont.Parse(this, config));
        var txt = this.add.bitmapText(100, 100, 'knighthawks', 'HELLO');

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