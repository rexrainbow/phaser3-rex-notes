import 'phaser';
import ScaleOuterPlugin from '../../plugins/scaleouter-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var config = this.game.config;
        this.add.rectangle(0, 0, config.width, config.height)
            .setStrokeStyle(10, 0xff0000)
            .setOrigin(0)

        this.print = this.add.text(0, 0, '', { fontSize: 24 });

        // this.cameras.main.setZoom(0.5);

        this.tweens.add({
            targets: this.cameras.main,
            duration: 3000,
            scrollX: -300,
            zoom: 0.5,
            repeat: -1,
            yoyo: true
        })
    }

    update() {
        var camera = this.cameras.main;

        this.print.text = `\
ScrollX = ${camera.scrollX}
ScrollY = ${camera.scrollY}
ZoomX = ${camera.zoomX}
ZoomY = ${camera.zoomY}
\
`
    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,  // 768
    height: 600,  // 1334
    backgroundColor: 0x333333,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.NONE,
    },
    scene: Demo,
    plugins: {
        scene: [{
            key: 'rexScaleOuter',
            plugin: ScaleOuterPlugin,
            mapping: 'rexScaleOuter'
        }]
    }
};

var game = new Phaser.Game(config);