import CreateDashedTexture from '../../plugins/utils/texture/CreateDashedTexture.js';
import CreateRectangleTexture from '../../plugins/utils/texture/CreateRectangleTexture.js';
import CreateCircleTexture from '../../plugins/utils/texture/CreateCircleTexture.js';
import CreateTriangleTexture from '../../plugins/utils/texture/CreateTriangleTexture.js';
import LinePlugin from '../../plugins/line-plugin.js'

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var extendMode = 1; // 0, or 1
        if (extendMode === 1) {
            CreateDashedTexture(this, 'body', 10, 0.4, 0x8888ff);
        } else {
            CreateRectangleTexture(this, 'body', 10, 10, 0x8888ff);
        }
        CreateCircleTexture(this, 'start', 20, 0x8888ff);
        CreateTriangleTexture(this, 'end', 20, 20, 0x8888ff, 0);

        var line = this.add.rexLine({
            start: {
                x: 400, y: 300,
                key: 'start', origin: 0.5,
            },
            end: {
                x: 600, y: 300,
                key: 'end', origin: 1,
            },

            body: {
                key: 'body', extendMode: extendMode,
                width: 5,
            }
        });

        //var startPoint = this.add.circle(line.x0, line.y0, 10, 0xff0000);
        //var endPoint = this.add.circle(line.x1, line.y1, 10, 0xff0000);

        this.input.on('pointermove', function (pointer) {
            line.setLineEndPosition(pointer.x, pointer.y);
            //endPoint.setPosition(line.x1, line.y1);
        })


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
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexLine',
            plugin: LinePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);