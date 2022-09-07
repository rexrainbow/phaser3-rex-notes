import phaser from 'phaser/src/phaser.js';
import GetViewport from '../../plugins/utils/system/GetViewport.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var camera = this.cameras.main;
        camera.setZoom(0.75).setScroll(500, -500);

        var graphics = this.add.graphics({
            lineStyle: {
                width: 10,
                color: 0xff0000,
                alpha: 1
            },
        })

        var onResize = (function () {
            var viewport = GetViewport(this, camera);
            graphics.strokeRectShape(viewport);
        }).bind(this);
        this.scale.on('resize', onResize);
        onResize();
    }

    update() {

    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.ENVELO,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo,
};

var game = new Phaser.Game(config);