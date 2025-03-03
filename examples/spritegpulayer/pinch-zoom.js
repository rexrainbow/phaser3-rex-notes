import phaser from '../../../phaser/src/phaser.js';
import CanvasDataPlugin from '../../plugins/canvasdata-plugin.js';
import CreateRectangleTexture from '../../plugins/utils/texture/CreateRectangleTexture.js';
import CameraControllerPlugin from '../../plugins/cameracontroller-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
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

        var controller = this.plugins.get('rexCameraController').add(this, {
            inputTarget: this,

            mouseWheelZoomMin: 0.01,

            panScroll: false,
            pinchZoomFocusEnable: false,
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
        global: [
            {
                key: 'rexCanvasData',
                plugin: CanvasDataPlugin,
                start: true
            },
            {
                key: 'rexCameraController',
                plugin: CameraControllerPlugin,
                start: true
            },
        ]
    }
};

var game = new Phaser.Game(config);