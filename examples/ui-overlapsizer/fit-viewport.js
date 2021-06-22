import 'phaser';
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
        var win = CreateSizer(this);

        var print = this.add.text(0, 0, '');
        var graphics = this.add.graphics();

        var scene = this;
        var onResize = function () {
            var viewport = scene.rexUI.viewport;
            win
                .setPosition(viewport.centerX, viewport.centerY)
                .setMinSize(viewport.width - 50, viewport.height - 50)
                .layout()

            print
                .setPosition(viewport.x + 10, viewport.y + 10)
                .setText(`${viewport.width},${viewport.height}`)

            graphics
                .clear()
                .lineStyle(20, 0xff0000)
                .strokeRectShape(viewport)
        }
        this.scale.on('resize', onResize);

        onResize();
    }

    update() { }
}

var CreateSizer = function (scene) {
    return scene.rexUI.add.overlapSizer({
        space: { left: 0, right: 0, top: 0, bottom: 0 }
    })
        // .addBackground(scene.rexUI.add.roundRectangle(0, 0, 0, 0, 0, 0xffffff))
        .add(
            scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, COLOR_PRIMARY), // child
            'main' // key
        )
        .add(
            scene.rexUI.add.roundRectangle(0, 0, 40, 0, 20, COLOR_DARK), // child
            'left', // key
            'left', // align
            0, // padding
            { height: true }
        )
        .add(
            scene.rexUI.add.roundRectangle(0, 0, 40, 0, 20, COLOR_DARK), // child
            'right', // key
            'right', // align
            0, // padding
            { height: true }
        )
        .add(
            scene.rexUI.add.roundRectangle(0, 0, 40, 40, 10, COLOR_LIGHT), // child
            'top', // key
            'center-top', // align
            0, // padding
            false // expand
        )
        .add(
            scene.rexUI.add.roundRectangle(0, 0, 40, 40, 10, COLOR_LIGHT), // child
            'bottom', // key
            'center-bottom', // align
            0, // padding
            false // expand
        )
        .add(
            scene.rexUI.add.label({
                background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, COLOR_DARK),
                icon: scene.rexUI.add.roundRectangle(0, 0, 24, 24, 10, COLOR_LIGHT),
                text: scene.add.text(0, 0, 'Start'),
                space: {
                    left: 20, right: 20, top: 20, bottom: 20,
                    icon: 10
                }
            }), // child
            'center', // key
            'center', // align
            0, // padding
            false // expand
        );
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.ENVELOP,
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