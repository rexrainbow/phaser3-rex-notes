import phaser from 'phaser/src/phaser.js';
import AddViewportCoordinateProperties from '../../plugins/behaviors/viewportcoordinate/AddViewportCoordinateProperties.js';
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
        var viewport = new Phaser.Geom.Rectangle();
        this.scale.on('resize', function () {
            GetViewport(this, viewport);
        }, this);

        var sprite = this.add.rectangle(0, 0, 30, 30).setStrokeStyle(2, 0xff0000);
        AddViewportCoordinateProperties(sprite, viewport);
        sprite.vpx = 0.3;

        var tween = this.tweens.add({
            targets: sprite,
            vpx: 0.7,
            ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 2000,
            repeat: -1,            // -1: infinity
            yoyo: true
        });


        this.sprite = sprite;
        this.print = this.add.text(0, 0, '');
    }

    update() {
        this.print.text = `${this.sprite.x.toFixed(2)}, ${this.sprite.y.toFixed(2)}`
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
    scene: Demo
};

var game = new Phaser.Game(config);