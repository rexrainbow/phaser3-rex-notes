import phaser from 'phaser/src/phaser.js';
import DragRotatePlugin from '../../plugins/dragrotate-plugin.js';

const ColorGray = 0x8e8e8e;
const ColorBlue = 0x5eb8ff;
const ColorRed = 0xfa5788;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var obj = this.add.container(400, 300, [
            this.add.rectangle(0, 0, 200, 200, ColorGray, 0.5).setName('bg'),
            this.add.circle(100, 0, 30, ColorGray)
        ])
            .setScrollFactor(0);

        this.cameras.main.setScroll(-10000, -10000)

        this.plugins.get('rexDragRotate').add(this, {
            origin: obj,
        })
            .on('drag', function (dragRotate) {
                obj.rotation += dragRotate.deltaRotation;
                var color = (dragRotate.cw) ? ColorBlue : ColorRed;
                obj.getByName('bg').setStrokeStyle(5, color);
            })
            .on('dragend', function () {
                obj.getByName('bg').setStrokeStyle();
            })

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
            key: 'rexDragRotate',
            plugin: DragRotatePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);