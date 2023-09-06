import phaser from 'phaser/src/phaser.js';
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
        var dialog = this.rexUI.add.dialog({
            x: 400, y: 300,
            width: 400,

            background: this.rexUI.add.roundRectangle({
                radius: 20,
                strokeColor: COLOR_PRIMARY,
                strokeWidth: 5
            }),

            title: CreateLabel(this, 'Title'),

            content: CreateContent(this),

            description: CreateLabel(this, 'Description'),

            space: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,

                title: 20,
                content: 20,
            },

            expand: {
                title: true,
                content: true,
                description: true,
            },

            align: {
                // title: 'center',
                // content: 'center',
                // description: 'center',
            },
        })
            .setDraggable('title')   // Draggable-background
            .layout()
            // .drawBounds(this.add.graphics(), 0xff0000)
            .popUp(1000)
        // .moveFrom('-=400', undefined, 1000, 'Bounce')
    }

    update() { }
}

var CreateLabel = function (scene, text) {
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle({
            color: COLOR_DARK,
            strokeColor: COLOR_LIGHT
        }),

        text: scene.add.text(0, 0, text, {
            fontSize: '24px'
        }),

        space: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10
        }
    });
}

var CreateContent = function (scene) {
    var panel = scene.rexUI.add.sizer({
        orientation: 'y',
        space: { left: 10, right: 10, top: 10, bottom: 10 }
    });

    panel.addBackground(
        scene.rexUI.add.roundRectangle({
            radius: 10,
            strokeColor: COLOR_LIGHT
        }),
        'background'
    )

    for (var i = 0; i < 8; i++) {
        panel.add(
            CreateLabel(scene, i.toString()),
            { expand: true }
        );
    }

    return panel;
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