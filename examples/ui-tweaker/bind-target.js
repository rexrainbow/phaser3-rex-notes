import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_PRIMARY = 0x424242;
const COLOR_LIGHT = 0x6d6d6d;
const COLOR_DARK = 0x1b1b1b;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('settings', 'assets/images/settings.png');
    }

    create() {
        var panel = CreatePanel(this)
            .setPosition(0, 0)
            .setOrigin(0)

        SetupContent(panel).layout();


        var circle0 = this.add.circle(400, 300, 40, 0xff0000).setStrokeStyle(4, 0xffffff)
            .setName('circle0')
            .setDepth(1)
            .setInteractive()
            .on('pointerup', function () {
                panel.setBindingTarget(circle0);
            })

        var circle1 = this.add.circle(500, 300, 40, 0x888888).setStrokeStyle(4, 0xffffff)
            .setName('circle1')
            .setDepth(1)
            .setInteractive()
            .on('pointerup', function () {
                panel.setBindingTarget(circle1);
            })

        panel.setBindingTarget(circle0);
    }

    update() {
    }
}

var SetupContent = function (panel) {
    panel
        .addFolder({
            title: 'Position',
            expanded: false
        })
        .addInput(
            {
                bindingKey: 'x',
                view: 'range',

                icon: 'settings',           // Title icon
                min: 0, max: 800,           // Range
                format(value) {             // Formatter of text
                    return value.toFixed(2);
                },
                // inputTextReadOnly: true  // Uneditable
            }
        )
        .addInput(
            {
                bindingKey: 'y',
                view: 'list',

                icon: 'settings',           // Title icon
                options: [                  // List options
                    { text: 'top', value: 0 },
                    { text: 'center', value: 300 },
                    { text: 'bottom', value: 600 },
                ]
                // Default list is dropdown-list
            }
        )

    panel
        .addInput(
            {
                bindingKey: 'radius',
                view: 'buttons',           // Buttons list


                icon: 'settings',           // Title icon
                title: 'size',              // Custom title
                options: [                  // List options
                    { text: 'L', value: 40 },
                    { text: 'M', value: 20 },
                    { text: 'S', value: 10 },
                ],
            }
        )
        .addSeparator()

    var pages = panel
        .addTab({
            pages: [
                { title: 'Display' },
                { title: 'Color', show: true }
            ]
        })

    pages[0]
        .addInput(
            {
                bindingKey: 'alpha',
                view: 'number',

                icon: 'settings',           // Title icon
            }
        )
        .addInput(
            {
                bindingKey: 'visible',
                view: 'boolean',

                icon: 'settings',           // Title icon
            }
        )

    pages[1]
        .addButton({
            title: 'New-\ncolor',
            icon: 'settings',             // Title icon

            label: 'Random',
            callback: function (target) {
                var fillColor = Phaser.Math.Between(0, 0x1000000);
                target.fillColor = fillColor;
                target.strokeColor = 0x1000000 - fillColor;
            },
        })
        .addInput(
            {
                bindingKey: 'fillColor',
                view: 'color',

                title: 'color',             // Custom title
                icon: 'settings',           // Title icon                
                monitor: true,
            }
        )
        .addInput(
            {
                bindingKey: 'strokeColor',
                view: 'color',

                title: 'stroke',            // Custom title
                icon: 'settings',           // Title icon               
                monitor: true,
            }
        )
        .addInput(
            {
                bindingKey: 'lineWidth',
                view: 'range',

                title: 'stroke-\nwidth',    // Custom title
                icon: 'settings',           // Title icon
                min: 0, max: 10,            // Range
            }
        )

    panel
        .addSeparator()
        .addInput(
            {
                bindingKey: 'name',
                view: 'string',

                icon: 'settings',           // Title icon
            }
        )

    return panel;
}

var CreatePanel = function (scene) {
    return scene.rexUI.add.tweaker({
        width: 300,

        styles: {
            background: {
                radius: 10,
                color: 0x0,
                strokeColor: 0xffffff,
            },

            inputRow: {
                background: {
                    strokeColor: COLOR_PRIMARY
                },

                title: {
                    iconSize: 30,
                    space: { icon: 2 }
                },

                inputText: {
                    background: {
                        color: COLOR_DARK
                    },
                    focusStyle: {
                        color: COLOR_PRIMARY,
                    },
                    style: {
                        backgroundBottomY: 4,
                        backgroundHeight: 18,
                    },
                    cursorStyle: {
                        color: 'black',
                        backgroundColor: 'white',
                    }
                },

                slider: {
                    track: {
                        color: COLOR_DARK,
                        height: 8,
                    },
                    indicator: {
                        color: COLOR_PRIMARY,
                        height: 8,
                    },
                    thumb: {
                        color: COLOR_LIGHT,
                        width: 16, height: 16,
                    },
                },

                list: {
                    label: {
                        background: {
                            color: COLOR_DARK,
                        },
                        space: { left: 5, right: 5 }
                    },
                    button: {
                        background: {
                            color: COLOR_DARK,
                            strokeColor: COLOR_LIGHT,

                            'active.color': COLOR_LIGHT,
                        },
                        space: { left: 5, right: 5, top: 8, bottom: 8 }
                    },
                },

                button: {
                    background: {
                        color: COLOR_DARK,
                        strokeColor: COLOR_LIGHT,
                        'active.color': COLOR_LIGHT,
                    },
                    space: { left: 8, right: 8, top: 8, bottom: 8 }
                },

                checkbox: {
                    color: COLOR_LIGHT,
                    boxStrokeColor: COLOR_DARK,
                    uncheckedColor: COLOR_DARK,
                },

                colorInput: {
                    colorPicker: {
                        background: { color: 0x0, strokeColor: COLOR_LIGHT },
                    },

                    colorComponents: {
                        inputText: {
                            background: {
                                color: COLOR_DARK
                            },
                            focusStyle: {
                                color: COLOR_PRIMARY,
                            },
                            style: {
                                backgroundBottomY: 4,
                                backgroundHeight: 18,
                            },
                            cursorStyle: {
                                color: 'black',
                                backgroundColor: 'white',
                            }
                        }
                    }
                },

                proportion: {
                    title: 1,
                    inputField: 1.5,
                    range: { slider: 2, inputText: 1 }
                }
            },

            folder: {
                title: {
                    iconSize: 30,
                    background: { color: COLOR_DARK },
                    space: { icon: 2 }
                },

                background: {
                    strokeColor: COLOR_DARK
                },

                space: {
                    left: 10, right: 0, top: 5, bottom: 5, item: 3
                },

                expandedIconColor: COLOR_PRIMARY,
            },

            tab: {
                tab: {
                    background: {
                        color: COLOR_DARK,
                        strokeColor: COLOR_PRIMARY,
                        'active.color': COLOR_PRIMARY,
                    },
                    space: { left: 3, right: 3, top: 3, bottom: 3 }
                },
                tabs: {
                    space: { item: 3 }
                },
                pages: {
                    fadeIn: 300
                },
            },

            separator: {
                height: 5,
                color: COLOR_DARK
            },

            space: {
                left: 10, right: 10, top: 10, bottom: 10, item: 3
            }
        },
    })
}

var config = {
    type: Phaser.AUTO,
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