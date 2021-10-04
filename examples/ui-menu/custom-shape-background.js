import 'phaser';
import UIPlugin from '../../templates/ui/ui-plugin.js';
import { CustomShapes } from '../../templates/ui/ui-components.js';

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
                root: true,
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
    var exapndOrientation = 'y';
    var easeOrientation = 'y';

    var menu = scene.rexUI.add.menu({
        x: x,
        y: y,
        orientation: exapndOrientation,
        // subMenuSide: 'right',

        items: items,
        createButtonCallback: function (item, index, items) {
            var isFirstButton = (index === 0);
            var isLastButton = (index === (items.length - 1));
            var convexEdges = {
                left: (isFirstButton) ? ((item.root) ? 0 : -1) : 0,
                right: 0,
                top: (isFirstButton) ? 0 : -1,
                bottom: (isLastButton) ? 0 : 1
            }

            return scene.rexUI.add.label({
                background: CreateJigsawShape(scene, convexEdges, 10, COLOR_PRIMARY, COLOR_DARK),
                text: scene.add.text(0, 0, item.name, {
                    fontSize: '20px'
                }),
                icon: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_DARK),
                space: {
                    left: 20,
                    right: 20,
                    top: 20,
                    bottom: 20,
                    icon: 10
                }
            })
        },

        // easeIn: 500,
        easeIn: {
            duration: 500,
            orientation: easeOrientation
        },

        // easeOut: 100,
        easeOut: {
            duration: 100,
            orientation: easeOrientation
        }

        // expandEvent: 'button.over'
    });

    menu
        .on('expand', function (subMenu, parentButton) {
            parentButton.getElement('background').setEonvexEdges('right', 1);
        })
        .on('collapse', function (subMenu, parentButton, rootMenu) {
            if (!parentButton) {
                return;
            }
            parentButton.getElement('background').setEonvexEdges('right', 0);
        })
        .on('button.over', function (button) {
            button.getElement('background').setStrokeStyle(1, 0xffffff);
        })
        .on('button.out', function (button) {
            button.getElement('background').setStrokeStyle(1, COLOR_DARK);
        })
        .on('button.click', function (button) {
            onClick(button);
        })

    return menu;
}

class JigsawShape extends CustomShapes {
    constructor(scene) {
        var config = {
            type: 'Jigsaw',
            create: { lines: 1 },
            update: function () {
                var radius = this.radius;
                var x0 = this.lineWidth, y0 = this.lineWidth,
                    x1 = this.width - x0 * 2, y1 = this.height - y0;
                var segX0 = (radius * 2), segX1 = segX0 + (radius * 2);
                var segY0 = (radius * 2), segY1 = segY0 + (radius * 2);
                var convexEdges = this.convexEdges;

                var polygon = this.getShapes()[0]
                    .lineStyle(this.lineWidth, this.strokeColor, 1)
                    .fillStyle(this.fillColor, 1)
                    .setIterations(8)
                    .startAt(x0, y0)

                var convexTop = convexEdges.top;
                if (convexTop === 1) {
                    polygon.lineTo(segX0, y0).arc(segX0 + radius, y0, radius, 180, 360).lineTo(x1, y0)
                } else if (convexTop === -1) {
                    polygon.lineTo(segX0, y0).arc(segX0 + radius, y0, radius, 180, 360, true).lineTo(x1, y0)
                } else {
                    polygon.lineTo(x1, y0)
                }

                var convexRight = convexEdges.right;
                if (convexRight === 1) {
                    polygon.lineTo(x1, segY0).arc(x1, segY0 + radius, radius, 270, 90).lineTo(x1, y1)
                } else if (convexRight === -1) {
                    polygon.lineTo(x1, segY0).arc(x1, segY0 + radius, radius, 270, 90, true).lineTo(x1, y1)
                } else {
                    polygon.lineTo(x1, y1)
                }

                var convexBottom = convexEdges.bottom;
                if (convexBottom === 1) {
                    polygon.lineTo(segX1, y1).arc(segX1 - radius, y1, radius, 0, 180).lineTo(x0, y1)
                } else if (convexBottom === -1) {
                    polygon.lineTo(segX1, y1).arc(segX1 - radius, y1, radius, 0, 180, true).lineTo(x0, y1)
                } else {
                    polygon.lineTo(x0, y1)
                }

                var convexLeft = convexEdges.left;
                if (convexLeft === 1) {
                    polygon.lineTo(x0, segY1).arc(x0, segY1 - radius, radius, 90, 270).lineTo(x0, y0)
                } else if (convexLeft === -1) {
                    polygon.lineTo(x0, segY1).arc(x0, segY1 - radius, radius, 90, 270, true).lineTo(x0, y0)
                } else {
                    polygon.lineTo(x0, y0)
                }

                polygon
                    .close();

            }
        }

        super(scene, config);
        scene.add.existing(this);

        this.convexEdges = {
            left: 0, right: 0, top: 0, bottom: 0
        }
    }

    setEonvexEdges(name, state) {
        if (typeof (name) === 'string') {
            this.convexEdges[name] = state;
        } else {
            var states = name;
            for (var name in states) {
                this.setEonvexEdges(name, states[name]);
            }
        }
        this.setDirty(true);
        return this;
    }

    setRadius(radius) {
        this.radius = radius;
        this.setDirty(true);
        return this;
    }
}

var CreateJigsawShape = function (scene, convexEdges, radius, fillColor, strokeColor) {
    return (new JigsawShape(scene))
        .setEonvexEdges(convexEdges)
        .setRadius(radius)
        .setFillStyle(fillColor, 1)
        .setStrokeStyle(2, strokeColor, 1);
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