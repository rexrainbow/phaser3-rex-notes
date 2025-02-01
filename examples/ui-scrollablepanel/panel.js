import phaser from '../../../phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_MAIN = 0x4e342e;
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
        var data = {
            name: 'Rex',
            skills: [
                { name: 'A' },
                { name: 'B' },
                { name: 'C' },
                { name: 'D' },
                { name: 'E' },
            ],
            items: [
                { name: 'A' },
                { name: 'B' },
                { name: 'C' },
                { name: 'D' },
                { name: 'E' },
                { name: 'F' },
                { name: 'G' },
                { name: 'H' },
                { name: 'I' },
                { name: 'J' },
                { name: 'K' },
                { name: 'L' },
                { name: 'M' },
            ],

        };

        var scrollablePanel = this.rexUI.add.scrollablePanel({
            x: 400,
            y: 300,
            width: 400,
            // height: 220,

            scrollMode: 1,

            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 10, COLOR_MAIN),

            panel: {
                child: createPanel(this, data),

                mask: {
                    padding: 1,
                },
            },

            slider: {
                track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
                thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
            },

            // slider: {
            //     track: { width: 20, radius: 10, color: COLOR_DARK },
            //     thumb: { radius: 13, color: COLOR_LIGHT }
            // },

            // scrollDetectionMode: 1,

            scroller: {
                // pointerOutRelease: false,
            },

            mouseWheelScroller: {
                focus: false,
                speed: 0.1
            },

            space: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,

                panel: 10,
                // slider: { left: 30, right: 30 },
            }
        })
            .layout()
        // .drawBounds(this.add.graphics(), 0xff0000);
        // .popUp(300)

        var print = this.add.text(0, 0, '');

        // Solution A: Add touch event on children of panel
        this.input.topOnly = false;  // or 'scrollDetectionMode: 1'
        var labels = [];
        labels.push(...scrollablePanel.getElement('#skills.items', true));
        labels.push(...scrollablePanel.getElement('#items.items', true));
        var scene = this;
        labels.forEach(function (label) {
            if (!label) {
                return;
            }

            var click = scene.rexUI.add.click(label.getElement('icon'))
                .on('click', function () {
                    if (!scrollablePanel.isInTouching('mask')) {
                        return;
                    }
                    var category = label.getParentSizer().name;
                    print.text += `${category}:${label.text}\n`;
                });
        })

        // Add children-interactive
        // Solution B: targests is an array of parentSizer of hit-targets
        // scrollablePanel.setChildrenInteractive({
        //     targets: [
        //         scrollablePanel.getByName('skills', true),
        //         scrollablePanel.getByName('items', true)
        //     ]
        // })
        //     .on('child.click', function (child) {
        //         var category = child.getParentSizer().name;
        //         print.text += `${category}:${child.text}\n`;
        //     })

        // Solution C: targets is an array of hit-targets
        // scrollablePanel.setChildrenInteractive({
        //     targets: [
        //         ...scrollablePanel.getByName('skills', true).getElement('items'),
        //         ...scrollablePanel.getByName('items', true).getElement('items')
        //     ],
        //     targetMode: 'direct',
        // })
        //     .on('child.click', function (child) {
        //         var category = child.getParentSizer().name;
        //         print.text += `${category}:${child.text}\n`;
        //     })


        scrollablePanel.getElement('scroller')
            .on('dragstart', function () {
                console.log('scroller.dragstart')
            })
            .on('dragend', function () {
                console.log('scroller.dragend')
            })

        scrollablePanel.getElement('slider')
            .on('inputstart', function () {
                console.log('slider.inputstart')
            })
            .on('inputend', function () {
                console.log('slider.inputend')
            })
    }

    update() { }
}

var createPanel = function (scene, data) {
    var sizer = scene.rexUI.add.sizer({
        orientation: 'x',
        space: { item: 10 }
    })
        // .enableLayer()
        .add(
            createHeader(scene, data), // child
            { expand: true }
        )
        .add(
            createTable(scene, data, 'skills', 1), // child
            { expand: true }
        )
        .add(
            createTable(scene, data, 'items', 2), // child
            { expand: true }
        )

    return sizer;
}

var createHeader = function (scene, data) {
    var title = scene.rexUI.add.label({
        orientation: 'x',
        text: scene.add.text(0, 0, 'Character'),
    });
    var header = scene.rexUI.add.label({
        orientation: 'y',

        // Can put built-in container as child of panel
        icon: scene.add.container(0, 0, [
            scene.rexUI.add.roundRectangle(0, 0, 100, 100, 5, COLOR_LIGHT)
        ]).setSize(140, 100),

        text: scene.add.text(0, 0, data.name),

        space: { icon: 10 }
    });

    return scene.rexUI.add.sizer({
        orientation: 'y',
        space: { left: 5, right: 5, top: 5, bottom: 5, item: 10 }
    })
        .addBackground(
            scene.rexUI.add.roundRectangle(0, 0, 0, 0, 0, undefined).setStrokeStyle(2, COLOR_LIGHT, 1)
        )
        .add(
            title, // child
            { expand: true, align: 'left' }
        )
        .add(header, // child
            { proportion: 1, expand: true }
        );
};

var createTable = function (scene, data, key, rows) {
    var capKey = key.charAt(0).toUpperCase() + key.slice(1);
    var title = scene.rexUI.add.label({
        orientation: 'x',
        text: scene.add.text(0, 0, capKey),
    });

    var items = data[key];
    var columns = Math.ceil((items.length * 2) / rows);
    var table = scene.rexUI.add.gridSizer({
        column: columns,
        row: rows,

        rowProportions: 1,
        space: { column: 10, row: 10 },
        name: key  // Search this name to get table back
    });

    var item;
    var iconSize = (rows === 1) ? 80 : 40;
    for (var i = 0, cnt = items.length; i < cnt; i++) {
        item = items[i];
        table.add(
            createIcon(scene, item, iconSize, iconSize),
            undefined,
            true,
            'top',
            0,
            true
        );

        table.add(createIcon(scene, item, iconSize, iconSize),
            {
                column: undefined,
                row: true,
                align: 'top',
                padding: 0,
                expand: true,
            }
        );
    }

    return scene.rexUI.add.sizer({
        orientation: 'y',
        space: { left: 10, right: 10, top: 10, bottom: 10, item: 10 }
    })
        .addBackground(
            scene.rexUI.add.roundRectangle(0, 0, 0, 0, 0, undefined).setStrokeStyle(2, COLOR_LIGHT, 1)
        )
        .add(title, // child
            {
                proportion: 0,
                align: 'left',
                padding: 0,
                expand: true
            }
        )
        .add(table, // child
            {
                proportion: 1,
                align: 'center',
                padding: 0,
                expand: true
            }
        );
}

var createIcon = function (scene, item, iconWidth, iconHeight) {
    var label = scene.rexUI.add.label({
        orientation: 'y',
        icon: scene.rexUI.add.roundRectangle(0, 0, iconWidth, iconHeight, 5, COLOR_LIGHT),
        text: scene.add.text(0, 0, item.name),

        space: { icon: 3 }
    });

    return label;
};

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