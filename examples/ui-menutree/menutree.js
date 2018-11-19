import UIPlugin from 'rexTemplates/ui/ui-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var items = [{
                name: 'AA',
                children: [{
                        name: 'AA-0'
                    },
                    {
                        name: 'AA-1'
                    },
                    {
                        name: 'AA-2'
                    },
                ]
            },
            {
                name: 'BB',
                children: [{
                        name: 'BB-0'
                    },
                    {
                        name: 'BB-1'
                    },
                    {
                        name: 'BB-2'
                    },
                ]
            },
            {
                name: 'CC',
                children: [{
                        name: 'CC-0'
                    },
                    {
                        name: 'CC-1'
                    },
                    {
                        name: 'CC-2'
                    },
                ]
            },
        ];
        var menuTree = this.rexUI.add.menuTree({
                items: items,
                createButtonCallback: function (scene, item, i) {
                    return scene.rexUI.add.label({
                        background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 0, 0x1a237e),
                        text: scene.add.text(0, 0, item.name, {
                            fontSize: '20px'
                        }),
                        icon: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0x534bae),
                        space: {
                            left: 10,
                            right: 10,
                            top: 10,
                            bottom: 10,
                            icon: 10
                        }
                    })
                },

                easeIn: {
                    duration: 500,
                    orientation: 'y'
                },

                easeOut: {
                    duration: 100,
                    orientation: 'y'
                }

            })
            .pushIntoBounds();

        menuTree
            .on('button.click', function (button) {
                debugger
            })
    }

    update() {}
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
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