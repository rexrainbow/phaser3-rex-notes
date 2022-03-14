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
        var scale = 0.5;
        var scrollX = 400, scrollY = 300;
        var centerX = (400 - scrollX) / scale,
            centerY = (300 - scrollY) / scale
        var bg = this.add.rectangle(
            centerX,
            centerY,
            800 / scale,
            600 / scale,
            0x333333
        )
            .setInteractive();
        var circle = this.add.circle(centerX, centerY, 32, 0x880000);

        var touchState = this.plugins.get('rexDragSpeed').add(bg)
            .on('touchmove', function (pointer) {
                circle.x += touchState.dx;
                circle.y += touchState.dy;
            })

        this.cameras.main.setScroll(-scrollX, -scrollY).setZoom(scale)
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