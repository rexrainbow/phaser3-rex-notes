import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

const Random = Phaser.Math.Between;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var gridTable = this.rexUI.add.gridTable({
            x: 400,
            y: 300,
            width: 300,
            height: 420,

            scrollMode: 0,

            background: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_PRIMARY),

            table: {
                cellWidth: undefined,
                cellHeight: 30,

                columns: 1,

                mask: {
                    padding: 2,
                },

                reuseCellContainer: true,
            },

            header: createMyLabel(this,
                'Id', 'Score',
                this.rexUI.add.roundRectangle(0, 0, 20, 20, 0, COLOR_DARK),
                undefined, 30
            ),

            footer: this.rexUI.add.label({
                width: undefined,
                height: 30,

                background: this.rexUI.add.roundRectangle(0, 0, 20, 20, 0, COLOR_DARK),
                text: this.add.text(0, 0, 'Footer'),
            }),

            space: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,

                table: 10,
                header: 10,
                footer: 10,
            },

            createCellContainerCallback: function (cell, cellContainer) {
                var scene = cell.scene,
                    width = cell.width,
                    height = cell.height,
                    item = cell.item,
                    index = cell.index;
                if (cellContainer === null) {
                    cellContainer = createMyLabel(scene);
                    console.log(cell.index + ': create new cell-container');
                } else {
                    console.log(cell.index + ': reuse cell-container');
                }

                // Set properties from item value
                cellContainer.setMinSize(width, height); // Size might changed in this demo
                cellContainer.getElement('id').setText(item.id);
                cellContainer.getElement('score').setText(item.score);
                return cellContainer;
            },
            items: getItems(100)
        })
            .layout()
        //.drawBounds(this.add.graphics(), 0xff0000);

    }

    update() { }
}

var createMyLabel = function (scene, id, score, background, width, height) {
    if (id === undefined) {
        id = '';
    }
    if (score === undefined) {
        score = '';
    }
    if (background === undefined) {
        background = scene.rexUI.add.roundRectangle(0, 0, 20, 20, 0).setStrokeStyle(2, COLOR_DARK)
    }
    return scene.rexUI.add.sizer({
        width: width,
        height: height,
        orientation: 'x',
    })
        .addBackground(
            background
        )
        .add(
            scene.add.text(0, 0, id),    // child
            0,                           // proportion, fixed width
            'center',                    // align vertically
            { left: 10 },                // padding
            false,                       // expand vertically
            'id'                         // map-key
        )
        .addSpace()
        .add(
            scene.add.text(0, 0, score), // child
            0,                           // proportion, fixed width
            'center',                    // align vertically
            { right: 10 },               // padding
            false,                       // expand vertically
            'score'                      // map-key
        )
}

var getItems = function (count) {
    var data = [];
    for (var i = 0; i < count; i++) {
        data.push({
            id: i,
            score: i
        });
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