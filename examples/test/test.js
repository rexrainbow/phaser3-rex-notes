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

    preload() {

    }

    create() {
        var data = {
            name: 'Rex',
            skills: [
                { name: 'A' },
                { name: 'B' },
                { name: 'C' },
                { name: 'D' },
                { name: 'E' },
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

        this.print = this.add.text(0, 0, '');
        var scrollablePanel = this.rexUI.add.scrollablePanel({
            x: 400,
            y: 300,
            width: 400,
            height: 220,

            scrollMode: 0,

            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 10, COLOR_PRIMARY),

            panel: {
                child: createPanel(this, data),

                mask: {
                    padding: 1,
                    // layer: this.add.layer()
                },
            },

            slider: {
                track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
                thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
            },

            // scroller: true,
            scroller: {
                // pointerOutRelease: false
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
        //.drawBounds(this.add.graphics(), 0xff0000);

        var print = this.add.text(0, 0, '');

        // Add children-interactive
        // Solution A:
        scrollablePanel.setChildrenInteractive({
            targets: [
                scrollablePanel.getByName('skills', true),
                scrollablePanel.getByName('items', true)
            ]
        })
            .on('child.click', function (child) {
                console.log(child)
                var category = child.getParentSizer().name;
                print.text += `${category}:${child.text}\n`;
            })

        scrollablePanel.getElement('scroller')
            .on('dragstart', function () {
                console.log('scroller.dragstart')
            })
            .on('dragend', function () {
                console.log('scroller.dragend')
            })
    }

    update() { }
}

var createPanel = function (scene, data) {
    var sizer = scene.rexUI.add.sizer({
        orientation: 'y',
        space: { item: 10 }
    })
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
        icon: scene.rexUI.add.roundRectangle(0, 0, 100, 100, 5, COLOR_LIGHT),
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
        )
};

var createTable = function (scene, data, key, rows) {
    var capKey = key.charAt(0).toUpperCase() + key.slice(1);
    var title = scene.rexUI.add.label({
        orientation: 'x',
        text: scene.add.text(0, 0, capKey),
    });

    var items = data[key];

    var columns = Math.ceil(items.length / rows);

    var spaceRow

    var space
    if (rows === 1) {
        spaceRow = 0
        space = { column: 20, row: spaceRow }
    } else {
        spaceRow = 40
        space = { column: 20, row: spaceRow }
    }
    var table = scene.rexUI.add.gridSizer({
        column: columns,
        row: rows,

        rowProportions: 1,
        space: space,
        name: key  // Search this name to get table back
    });

    var item, r, c;
    var iconSize = (rows === 1) ? 20 : 20;

    for (var i = 0, cnt = items.length; i < cnt; i++) {
        item = items[i];
        let rowCalc = 0
        r = i % rows;
        c = (i - r) / rows;

        if (rows == 2) {
            rowCalc = Math.floor(i / 7)
            r = rowCalc
            c = i % 7
        }

        table.add(
            createIcon(scene, item, iconSize, iconSize),
            c,
            r,
            'left',
            0,
            true
        );
    }


    return scene.rexUI.add.sizer({
        orientation: 'x',
        space: { left: 10, right: 10, top: 10, bottom: 30, item: 10 }
    })
        .addBackground(
            scene.rexUI.add.roundRectangle(0, 0, 0, 0, 0, undefined).setStrokeStyle(2, COLOR_LIGHT, 1)
        )
        .add(
            title, // child
            0, // proportion
            'left', // align
            0, // paddingConfig
            true // expand
        )
        .add(table, // child
            0, // proportion
            'center', // align
            0, // paddingConfig
            true // expand
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