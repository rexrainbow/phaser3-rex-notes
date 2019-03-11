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

    preload() {}

    create() {
        var keys = ['A', 'B', 'C', 'D'];
        var mainPanel = CreateMainPanel(this, keys)
            .setPosition(400, 300)
            .layout();
    }

    update() {}
}

var CreateMainPanel = function (scene, keys) {
    var buttons = CreateButtons(scene, keys);
    var pages = CreatePages(scene, keys);
    var mainPanel = scene.rexUI.add.sizer({
            orientation: 'y',
        }).add(
            buttons, //child
            0, // proportion
            'left', // align
            0, // paddingConfig
            false, // expand
        )
        .add(
            pages, //child
            0, // proportion
            'center', // align
            0, // paddingConfig
            false, // expand
        );

    var prevButton = undefined;
    buttons.on('button.click', function (button) {
        button.getElement('background').setFillStyle(COLOR_PRIMARY);
        if (prevButton) {
            prevButton.getElement('background').setFillStyle(COLOR_DARK);
        }
        prevButton = button;

        pages.swapPage(button.text);
    });

    var firstButton = buttons.getElement('buttons[0]');
    if (firstButton) {
        buttons.emit('button.click', firstButton);
    }
    return mainPanel;
}

var CreateButtons = function (scene, keys) {
    var buttons = [];
    for (var i = 0, cnt = keys.length; i < cnt; i++) {
        buttons.push(scene.rexUI.add.label({
            background: scene.rexUI.add.roundRectangle(0, 0, 10, 10, 0, COLOR_DARK),
            text: scene.add.text(0, 0, keys[i], {
                fontSize: '18pt'
            }),
            space: {
                top: 5,
                left: 10,
                right: 10,
                bottom: 2,
            }
        }));
    }
    return scene.rexUI.add.buttons({
        buttons: buttons,
        orientation: 0, // Left-right
    })
}

var CreatePages = function (scene, keys) {
    var x = 400,
        y = 300,
        minWidth = 250,
        minHeight = 400;
    var pages = scene.rexUI.add.pages(x, y, minWidth, minHeight)
        .addBackground(
            scene.rexUI.add.roundRectangle(0, 0, 10, 10, 0, COLOR_PRIMARY)
        )

    var key;
    for (var i = 0, cnt = keys.length; i < cnt; i++) {
        key = keys[i];
        pages.addPage(
            scene.rexUI.add.label({
                text: scene.add.text(0, 0, key, {
                    fontSize: 24
                })
            }), // game object
            key, // key
            'center', // align
            10, // padding
            false, // extend
        )
    }
    return pages;
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