import phaser from 'phaser/src/phaser.js';
import CoverPlugin from '../../plugins/cover-plugin.js'

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var cover = this.add.rexCover({ color: 0x550000, alpha: 0.7 });
        var layer = this.add.layer();
        layer.add(cover);

        var camera = this.cameras.add();
        camera.zoom = 0.5;
        layer.cameraFilter = 0xffffffff ^ camera.id;

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
            key: 'rexCover',
            plugin: CoverPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);