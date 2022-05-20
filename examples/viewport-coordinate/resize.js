import phaser from 'phaser/src/phaser.js';
import ViewportCoordinatePlugin from '../../plugins/viewportcoordinate-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var viewport = new Phaser.Geom.Rectangle();
        var UpdateViewport = (function() {
            viewport.setTo(10, 10, this.displaySize.width - 20, this.displaySize.height - 20);
        }).bind(this.scale);
        this.scale.on('resize', UpdateViewport);
        UpdateViewport();

        var sprite0 = this.add.rectangle(0, 0, 30, 30).setStrokeStyle(2, 0xffff00);
        this.plugins.get('rexViewportCoordinate').add(sprite0, viewport);
        sprite0.vpx = 0.3;

        var tween = this.tweens.add({
            targets: sprite0,
            vpx: 0.7,
            ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 2000,
            repeat: -1,            // -1: infinity
            yoyo: true
        });

        var sprite1 = this.add.rectangle(0, 0, 30, 30).setStrokeStyle(2, 0x00ff00);
        this.plugins.get('rexViewportCoordinate').add(sprite1, viewport);
        sprite1.vpx = 0.7;


        this.viewport = viewport;
        this.sprite0 = sprite0;
        this.dbgGraphics = this.add.graphics();
        this.print = this.add.text(0, 0, '');
    }

    update() {
        this.print.text = `${this.sprite0.x.toFixed(2)}, ${this.sprite0.y.toFixed(2)}`

        this.dbgGraphics
            .clear()
            .lineStyle(4, 0xff0000, 0.5)
            .strokeRectShape(this.viewport)
    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.RESIZE
    },
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexViewportCoordinate',
            plugin: ViewportCoordinatePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);