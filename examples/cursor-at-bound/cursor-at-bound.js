import CursorAtBoundPlugin from '../../plugins/cursoratbound-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
        this.clock;
        this.text;
    }

    preload() {}

    create() {
        this.cursorAtBounds = this.plugins.get('rexCursorAtBound').add(this, {
            sensitiveDistance: 20,
            // bounds: new Phaser.Geom.Rectangle(x, y, width, height)
        });
        this.print = this.add.text(0, 0, '');
    }

    update() {
        var cursorKeys = this.cursorAtBounds.createCursorKeys();
        var s = 'Key down: ';
        for (var name in cursorKeys) {
            if (cursorKeys[name].isDown) {
                s += name + ' ';
            }
        }
        this.print.text = s;
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
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexCursorAtBound',
            plugin: CursorAtBoundPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);