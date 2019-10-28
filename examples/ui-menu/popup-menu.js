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
            {
                name: 'AA',
                children: [
                    {
                        name: 'AA-0',
                        children: [
                            { name: 'AA-00' },
                            { name: 'AA-01' },
                            { name: 'AA-02' },
                        ]
                    },
                    {
                        name: 'AA-1',
                        children: [
                            { name: 'AA-10' },
                            { name: 'AA-11' },
                            { name: 'AA-12' },
                        ]
                    },
                    {
                        name: 'AA-2',
                        children: [
                            { name: 'AA-20' },
                            { name: 'AA-21' },
                            { name: 'AA-22' },
                        ]
                    },
                ]
            },
            {
                name: 'BB',
                children: [
                    { name: 'BB-0' },
                    { name: 'BB-1' },
                    { name: 'BB-2' },
                ]
            },
            {
                name: 'CC',
                children: [
                    { name: 'CC-0' },
                    { name: 'CC-1' },
                    { name: 'CC-2' },
                ]
            },
        ];

        var scene = this,
            menu = undefined;
        this.print = this.add.text(0, 0, '');
        this.input.on('pointerdown', function (pointer) {
            if (menu === undefined) {
                menu = createMenu(scene, pointer.x, pointer.y, items, function (button) {
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

var createMenu = function (scene, x, y, items, onClick) {
    var menu = scene.rexUI.add.menu({
        x: x,
        y: y,

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

        easeIn: 500,
        easeOut: 100,
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

    return menu;
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