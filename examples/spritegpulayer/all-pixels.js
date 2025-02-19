import phaser from '../../../phaser/src/phaser.js';
import CanvasDataPlugin from '../../plugins/canvasdata-plugin.js';
import CreateRectangleTexture from '../../plugins/utils/texture/CreateRectangleTexture.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
        this.load.image('mushroom', 'assets/images/mushroom.png');
    }

    create() {
        var img = this.add.image(400, 300, 'classroom').setVisible(false);

        CreateRectangleTexture(this, 'dot', 1, 1);
        var layer = this.add.spriteGPULayer('dot', img.width * img.height)

        var template = {
            x: 0, y: 0,
            originX: 0, originY: 0,
        }
        this.plugins.get('rexCanvasData').textureTColorMap(img)
            .forEachNonZero(function (value, x, y, colorMap) {
                var color = value & 0xffffff;
                var alpha = ((value >> 24) & 0xff) / 0xff;

                template.x = x;
                template.y = y;
                template.tintBottomLeft = color;
                template.tintTopLeft = color;
                template.tintBottomRight = color;
                template.tintTopRight = color;
                template.alphaBottomLeft = alpha;
                template.alphaTopLeft = alpha;
                template.alphaBottomRight = alpha;
                template.alphaTopRight = alpha;

                layer.addMember(template);
            })


        this.input
            .on('pointerdown', function () {
                img.setVisible(true);
                layer.setVisible(false);
                console.log('show image')
            })
            .on('pointerup', function () {
                img.setVisible(false);
                layer.setVisible(true);
                console.log('show sprite-gpu-layer')
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
        global: [
            {
                key: 'rexCanvasData',
                plugin: CanvasDataPlugin,
                start: true
            }
        ]
    }
};

var game = new Phaser.Game(config);