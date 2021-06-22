import 'phaser';
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
        var print = this.add.text(0, 0, '');
        var OnSelectLevel = function (index) {
            print.text += `Select ${index}\n`;
        }

        var gridTable = this.rexUI.add.gridTable({
            x: 400, y: 300,
            width: 300, height: 420,

            table: {
                cellHeight: 120,

                columns: 3,

                mask: {
                    padding: 2,
                },

                reuseCellContainer: true,
            },

            createCellContainerCallback: function (cell, cellContainer) {
                var scene = cell.scene,
                    width = cell.width,
                    height = cell.height,
                    item = cell.item,
                    index = cell.index;

                if (cellContainer === null) {
                    cellContainer = CreateLevelButton(scene, width, height);
                }

                // Set name-text of level
                cellContainer.getElement('name').setText(item.name);
                // Represent score of level via stars
                var stars = cellContainer.getElement('stars');
                for (var i = 0, cnt = stars.length; i < cnt; i++) {
                    var color = (item.stars[i]) ? COLOR_PRIMARY : undefined;
                    stars[i].setFillStyle(color);
                }
                cellContainer.setMinSize(width, height); // Size might changed in this demo
                return cellContainer;
            },

            items: CreateItems(40)
        })
            .layout()


        gridTable
            .on('cell.1tap', function (cellContainer, cellIndex) {
                // Test if pointer is under background element
                var background = cellContainer.getElement('background');
                if (this.rexUI.isInTouching(background)) {
                    OnSelectLevel(cellIndex);
                }
            }, this)
    }

    update() { }
}

var CreateLevelButton = function (scene, width, height) {
    // Replace roundRectangle to nine-patch game object
    var background = scene.rexUI.add.roundRectangle(0, 0, 40, 40, 0).setStrokeStyle(2, COLOR_DARK);
    var name = scene.add.text(0, 0, '');
    // Replace roundRectangle to image game object
    var star0 = scene.rexUI.add.roundRectangle(0, 0, 20, 20, 0).setStrokeStyle(2, COLOR_DARK)
    var star1 = scene.rexUI.add.roundRectangle(0, 0, 20, 20, 0).setStrokeStyle(2, COLOR_DARK)
    var star2 = scene.rexUI.add.roundRectangle(0, 0, 20, 20, 0).setStrokeStyle(2, COLOR_DARK)

    var button = scene.rexUI.add.sizer({
        width: width, height: height,
        orientation: 'y'
    })
        .add(
            scene.rexUI.add.sizer({
                orientation: 'x'
            })
                .addSpace()
                .add(star0)
                .add(star1)
                .add(star2)
                .addSpace()
        )
        .add(
            // child : Text at center, with a background
            scene.rexUI.add.sizer({
                orientation: 'x'
            })
                .addBackground(background)
                .addSpace() // To centerize text
                .add(name)
                .addSpace() // To centerize text
            ,

            1, // proportion
            'center', // align
            { top: 10, bottom: 20, left: 10, right: 10 }, // padding
            true // expand
        )

    button.addChildrenMap('name', name);
    button.addChildrenMap('stars', [star0, star1, star2]);
    button.addChildrenMap('background', background);

    return button;
}

var CreateItems = function (itemCount) {
    var data = [];
    for (var i = 0; i < itemCount; i++) {
        data.push({
            name: `${i}`,
            stars: [false, true, false]
        })
    }
    return data;
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