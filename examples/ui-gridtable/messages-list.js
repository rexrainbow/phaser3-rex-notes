import UIPlugin from '../../templates/ui/ui-plugin.js';
import GetRandomWord from '../../plugins/utils/string/GetRandomWord.js'

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
        var gridTable = this.rexUI.add.gridTable({
            x: 400,
            y: 300,
            width: 300,
            height: 420,

            scrollMode: 0,

            background: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_PRIMARY),

            table: {
                cellWidth: undefined,
                cellHeight: 1,

                columns: 1,

                mask: {
                    padding: 2,
                },

                reuseCellContainer: true,
            },

            space: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,

                table: 10
            },

            createCellContainerCallback: function (cell, cellContainer) {
                var scene = cell.scene,
                    item = cell.item,
                    index = cell.index;
                if (cellContainer === null) {
                    cellContainer = CreateRowItem(scene);
                    console.log(cell.index + ': create new cell-container');
                } else {
                    console.log(cell.index + ': reuse cell-container');
                }

                // Set properties from item value
                var leftLabel = cellContainer.getElement('left');
                var rightLabel = cellContainer.getElement('right');
                var message = cellContainer.getElement('message');
                if (item.isLeft) {
                    scene.rexUI.show(leftLabel);
                    scene.rexUI.hide(rightLabel);
                    leftLabel.setText(item.name);
                } else {
                    scene.rexUI.show(rightLabel);
                    scene.rexUI.hide(leftLabel);
                    rightLabel.setText(item.name);
                }
                message
                    .setText(item.message)
                    .setFixedSize(1, 1) // For layout

                // Layout before add to grid tabele
                cellContainer
                    .setMinWidth(cell.width)
                    .setDirty()
                    .layout()
                    .setDirty(false);

                // Reset cell height
                cell.height = cellContainer.height;
                return cellContainer;
            },

            items: GetMessages(1)
        })
            .layout()
        //.drawBounds(this.add.graphics(), 0xff0000);
    }

    update() { }
}

const RandInt = Phaser.Math.Between;
var GetMessages = function (cnt) {
    var messages = [];
    for (var i = 0; i < cnt; i++) {
        var message = [];
        for (var w = 0, wcnt = RandInt(8, 15); w < wcnt; w++) {
            message.push(GetRandomWord(5, 10));
        }
        var isLeft = false// (Math.random() < 0.5);
        messages.push({
            isLeft: isLeft,
            name: (isLeft) ? 'aaa' : 'bbb',
            message: message.join(' ')
        })
    }
    return messages;
}

var CreateNameLabel = function (scene) {
    return scene.rexUI.add.label({
        orientation: 'y',
        icon: scene.rexUI.add.roundRectangle(0, 0, 40, 40, 10, COLOR_LIGHT),
        text: scene.rexUI.add.BBCodeText(0, 0, '', {
            backgroundColor: COLOR_DARK,
            backgroundCornerRadius: 10
        })
    })
}
var CreateRowItem = function (scene, config) {
    return scene.rexUI.add.sizer({
        orientation: 'x',
    })
        .add(
            CreateNameLabel(scene),               // child
            0,                                    // proportion, fixed width
            'center',                             // align vertically
            0,                                    // padding
            true,                                 // expand vertically
            'left'                                // map-key
        )
        .add(
            scene.rexUI.add.BBCodeText(0, 0, '', {
                backgroundColor: COLOR_DARK,
                wrap: {
                    mode: 'word',
                }
            }),                                    // child
            1,                                     // proportion, fixed width
            'center',                              // align vertically
            0,                                     // padding
            true,                                  // expand vertically
            'message'                              // map-key
        )
        .add(
            CreateNameLabel(scene),                // child
            0,                                     // proportion, fixed width
            'center',                              // align vertically
            0,                                     // padding
            true,                                  // expand vertically
            'right'                                // map-key
        )
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