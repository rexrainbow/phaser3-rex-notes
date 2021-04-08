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
        var items = [
            { label: 'AAA' },
            { label: 'BBB' },
            { label: 'CCC' },
            { label: 'DDD' }
        ];

        var scene = this,
            menu = undefined;
        this.print = this.add.text(0, 0, '');
        this.input.on('pointerdown', function (pointer) {
            if (menu === undefined) {
                menu = CreateList(scene, pointer.x, pointer.y, items, function (button) {
                    scene.print.text += 'Click ' + button.text + '\n';
                });
            } else if (!menu.isInTouching(pointer)) {
                menu.collapse();
                menu = undefined;
                scene.print.text = '';
            }
        }, this);
    }

    update() { }
}

var CreateDropDownList = function (scene, x, y, items) {
    var label = scene.rexUI.add.label({
        x: x, y: y,
        background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 0, COLOR_PRIMARY),
        // icon:
        text: scene.add.text(0, 0, item.name, {
            fontSize: '20px'
        })
        // action:
    })

    scene.rexUI.add.click(label)
        .on('click', function () {

        })
    return label;
}

var CreateList = function (scene, x, y, items, onClick) {
    var list = scene.rexUI.add.menu({
        x: x,
        y: y,
        orientation: 'y',

        items: items,
        createButtonCallback: function (item, i, items) {
            return scene.rexUI.add.label({
                background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 0, COLOR_PRIMARY),
                text: scene.add.text(0, 0, item.name, {
                    fontSize: '20px'
                }),
                icon: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_DARK),
                space: {
                    left: 10,
                    right: 10,
                    top: 10,
                    bottom: 10,
                    icon: 10
                }
            })
        },

        // easeIn: 500,
        easeIn: {
            duration: 500,
            orientation: 'y'
        },

        // easeOut: 100,
        easeOut: {
            duration: 100,
            orientation: 'y'
        }

        // expandEvent: 'button.over'
    });

    menu
        .on('button.over', function (button) {
            button.getElement('background').setStrokeStyle(1, 0xffffff);
        })
        .on('button.out', function (button) {
            button.getElement('background').setStrokeStyle();
        })
        .on('button.click', function (button) {
            onClick(button);
        })
        .on('popup.complete', function (subMenu) {
            console.log('popup.complete')
        })
        .on('scaledown.complete', function () {
            console.log('scaledown.complete')
        })

    return list;
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