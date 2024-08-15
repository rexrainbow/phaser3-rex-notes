import phaser from 'phaser/src/phaser.js';
import DragSpeedPlugin from '../../plugins/dragspeed-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

    }

    preload() { }

    create() {
        var bg = this.add.rectangle(400, 300, 500, 400, 0x333333)
            .setInteractive();

        var txtSpeed = this.add.text(0, 0, '-');
        var touchState = this.plugins.get('rexDragSpeed').add(bg, { rectBoundsInteractive: true })
            .on('touchstart', function (pointer) {
                txtSpeed.text = '-';
                txtSpeed.setText('-');
            })
            .on('touchend', function (pointer) {
                txtSpeed.text = `\
${touchState.speed}
${Math.floor(touchState.preX)},${Math.floor(touchState.preY)} -> ${Math.floor(touchState.x)},${Math.floor(touchState.y)}\
`
            });

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
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexDragSpeed',
            plugin: DragSpeedPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);