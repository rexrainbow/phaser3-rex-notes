import 'phaser';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

const GetValue = Phaser.Utils.Objects.GetValue;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

    }

    preload() {
    }

    create() {
        var print = this.add.text(0, 0, '');
        var win = CreateButtons(this)
            .setOrigin(1, 0)
            .on('button.click', function (button, index, pointer, event) {
                print.text += `Click button-${button.text}\n`;
            })

        var scene = this;
        var onResize = function () {
            var viewport = scene.rexUI.viewport;
            win
                .setPosition(viewport.right, viewport.top)
                .setMinSize(viewport.width / 2, viewport.height / 10)
                .layout()

            // Also anchor text game object
            print.setPosition(viewport.left, viewport.top);
        }
        this.scale.on('resize', onResize);
        onResize();
    }

    update() { }
}

var CreateButtons = function (scene) {
    return scene.rexUI.add.buttons({
        orientation: 'x',

        buttons: [
            createButton(scene, 'A'),
            createButton(scene, 'B'),
            createButton(scene, 'C'),
            createButton(scene, 'D'),
            createButton(scene, 'E'),
        ],

        space: {
            left: 10, right: 10, top: 10, bottom: 10,
            item: 3
        },
        expand: true
    })
}

var createButton = function (scene, text) {
    return scene.rexUI.add.label({
        width: 40,
        height: 40,
        background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, COLOR_LIGHT),
        text: scene.add.text(0, 0, text, {
            fontSize: 18
        }),
        space: {
            left: 10,
            right: 10,
        },
        align: 'center'
    });
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