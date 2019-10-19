import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

    }

    preload() { }

    create() {
        CreateTexture1(this, 'bg1');
        this.add.image(0, 0, 'bg1').setOrigin(0);

        this.rexUI.add.label({
            x: 400, y: 300,
            width: 250, height: 200,

            background: this.rexUI.add.ninePatch({
                key: 'bg1',
                columns: [10, 10, 10],
                rows: [10, 10, 10],
                stretchMode: {
                    edge: 'repeat',
                    internal: 'scale'
                }
            }),
            text: this.add.text(0, 0, 'Hello', {
                fontSize: '24px'
            }),
            icon: this.rexUI.add.roundRectangle(0, 0, 0, 0, 20, COLOR_LIGHT),
            space: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,
                icon: 10
            }
        })
            .layout()
            .drawBounds(this.add.graphics(), 0xff0000);
    }

    update() { }
}

var CreateTexture1 = function (scene, key) {
    // width: 10-10-10
    // height: 10-10-10
    var width = 30, height = 30;
    scene.add.graphics()
        .fillStyle(COLOR_PRIMARY)
        .fillRect(0, 0, 10, 10)
        .fillRect(width - 10, 0, 10, 10)
        .fillRect(0, height - 10, 10, 10)
        .fillRect(width - 10, height - 10, 10, 10)
        .fillCircle(15, 5, 4)
        .fillCircle(5, 15, 4)
        .fillCircle(15, 25, 4)
        .fillCircle(25, 15, 4)
        .generateTexture(key, width, height)
        .destroy();
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
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }
};

var game = new Phaser.Game(config);