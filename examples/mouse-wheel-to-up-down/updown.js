import MouseWheelToUpDownPlugin from '../../plugins/mousewheeltoupdown-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        this.mouseWheelToUpDown = this.plugins.get('rexMouseWheelToUpDown').add(this);
        this.circle = this.add.circle(400, 300, 20, 0xffffff);
    }

    update() {
        var cursorKeys = this.mouseWheelToUpDown.createCursorKeys();
        if (cursorKeys.up.isDown) {
            this.circle.y -= 3;
        } else if (cursorKeys.down.isDown) {
            this.circle.y += 3;
        }
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
            key: 'rexMouseWheelToUpDown',
            plugin: MouseWheelToUpDownPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);