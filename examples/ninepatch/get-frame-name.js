import NinePatchPlugin from '../../plugins/ninepatch-plugin.js'

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        CreateTexture(this, 'bg');
        this.add.image(0, 0, 'bg', '__BASE').setOrigin(0);
        this.add.rexNinePatch({
            x: 200, y: 300,
            width: 260, height: 200,
            key: 'bg',
            getFrameNameCallback: function (col, row) {
                var index = `${col},${row}`;
                switch (index) {
                    case '0,0':
                    case '0,2':
                    case '2,0':
                    case '2,2':
                        return 'corner';
                    case '1,0':
                    case '1,2':
                    case '0,1':
                    case '2,1':
                        return 'edge';
                    default:
                        return 'internal';
                }
            },
            columns: [20, 20, 20],
            rows: [20, 20, 20],
            stretchMode: {
                edge: 'repeat',
                internal: 'scale'
            }
        })
    }

    update() {
    }
}

const COLOR_PRIMARY = 0x1565c0;
const COLOR_LIGHT = 0x5e92f3;
const COLOR_DARK = 0x003c8f;
var CreateTexture = function (scene, key) {
    scene.add.graphics()
        .fillStyle(COLOR_DARK)
        .fillRect(0, 0, 60, 20)
        .fillStyle(COLOR_LIGHT)
        .fillRect(2, 2, 16, 16)
        .fillCircle(30, 10, 8)
        .generateTexture(key, 60, 20)
        .destroy();

    var texture = scene.textures.get(key);
    texture.add('corner', 0, 0, 0, 20, 20);
    texture.add('edge', 0, 20, 0, 20, 20);
    texture.add('internal', 0, 40, 0, 20, 20);
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
            key: 'rexNinePatch',
            plugin: NinePatchPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);