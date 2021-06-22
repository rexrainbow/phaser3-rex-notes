import 'phaser';
import UIPlugin from '../../templates/ui/ui-plugin.js';
import GetRandomWord from '../../plugins/utils/string/GetRandomWord.js';

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
            width: 400,
            height: 420,

            scrollMode: 0,

            background: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_PRIMARY),

            table: {
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

                table: 10,
                header: 10,
                footer: 10,
            },

            createCellContainerCallback: function (cell, cellContainer) {
                var scene = cell.scene,
                    width = cell.width,
                    item = cell.item,
                    index = cell.index;
                if (cellContainer === null) {
                    cellContainer = CreateCellContainer(scene).setOrigin(0);
                    console.log(cell.index + ': create new cell-container');
                } else {
                    console.log(cell.index + ': reuse cell-container');
                }

                // Set properties from item value

                // Set mini width
                cellContainer.setMinWidth(width);

                // Hide icon according to item.isLeft
                if (item.isLeft) {
                    scene.rexUI.show(cellContainer.getElement('left'))
                    scene.rexUI.hide(cellContainer.getElement('right'))
                } else {
                    scene.rexUI.show(cellContainer.getElement('right'))
                    scene.rexUI.hide(cellContainer.getElement('left'))
                }

                // Set content
                cellContainer.getElement('content')
                    .setText(item.content);

                // Set bubble shape
                cellContainer.getElement('bubble').setUpdateShapesCallback(
                    (item.isLeft) ? LeftTailBubble : RightTailBubble
                );

                // Layout manually, to get cell height
                cellContainer
                    .setDirty(true).layout()  // Run layout manually
                    .setDirty(false)          // Don't run layout again

                cell.height = cellContainer.height + 10;

                return cellContainer;
            },
            items: GetItems(100)
        })
            .layout()
        //.drawBounds(this.add.graphics(), 0xff0000);

    }

    update() { }
}

var CreateCellContainer = function (scene) {
    return scene.rexUI.add.sizer({
        orientation: 'x',
        space: { left: 25, right: 25, top: 10, bottom: 10, item: 10 }
    })
        .addBackground(
            CreateSpeechBubbleShape(scene, COLOR_PRIMARY, 0xffffff),
            'bubble'
        )
        .add(
            CreateIcon(scene),           // child
            0,                           // proportion, fixed width
            'bottom',                    // align vertically
            0,                           // padding
            false,                       // expand vertically
            'left'                       // map-key
        )
        .add(
            CreateText(scene),           // child
            1,                           // proportion
            'center',                    // align vertically
            0,                           // padding
            false,                       // expand vertically
            'content'                    // map-key
        )
        .add(
            CreateIcon(scene),           // child
            0,                           // proportion, fixed width
            'bottom',                    // align vertically
            0,                           // padding
            false,                       // expand vertically
            'right'                      // map-key
        )
}

var LeftTailBubble = function () {
    var fillColor = this.getData('fillColor');
    var strokeColor = this.getData('strokeColor');
    var radius = 20;
    var indent = 15;

    var left = 0 + indent, right = this.width - indent,
        top = 0, bottom = this.height;
    this.getShapes()[0]
        .lineStyle(2, strokeColor, 1)
        .fillStyle(fillColor, 1)
        // top line, right arc
        .startAt(left + radius, top).lineTo(right - radius, top).arc(right - radius, top + radius, radius, 270, 360)
        // right line, bottom arc
        .lineTo(right, bottom - radius).arc(right - radius, bottom - radius, radius, 0, 90)
        // bottom line, left tail
        .lineTo(0, bottom).lineTo(left, bottom - radius)
        // left line, top arc
        .lineTo(left, top + radius).arc(left + radius, top + radius, radius, 180, 270)
        .close();

}

var RightTailBubble = function () {
    var fillColor = this.getData('fillColor');
    var strokeColor = this.getData('strokeColor');
    var radius = 20;
    var indent = 15;

    var left = 0 + indent, right = this.width - indent,
        top = 0, bottom = this.height;
    this.getShapes()[0]
        .lineStyle(2, strokeColor, 1)
        .fillStyle(fillColor, 1)
        // top line, right arc
        .startAt(left + radius, top).lineTo(right - radius, top).arc(right - radius, top + radius, radius, 270, 360)
        // right line, right tail
        .lineTo(right, bottom - radius).lineTo(this.width, bottom)
        // bottom line, left arc
        .lineTo(left + radius, bottom).arc(left + radius, bottom - radius, radius, 90, 180)
        // left line, top arc
        .lineTo(left, top + radius).arc(left + radius, top + radius, radius, 180, 270)
        .close();
}

var CreateSpeechBubbleShape = function (scene, fillColor, strokeColor) {
    return scene.rexUI.add.customShapes({
        create: { lines: 1 }
    })
        .setData('fillColor', fillColor)
        .setData('strokeColor', strokeColor)

}

var CreateIcon = function (scene) {
    return scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, COLOR_LIGHT)
}

var CreateText = function (scene) {
    return scene.rexUI.wrapExpandText(scene.add.text(0, 0, ''));
}

var CreateContent = function () {
    var words = [];
    for (var i = 0, cnt = Phaser.Math.Between(3, 20); i < cnt; i++) {
        words.push(GetRandomWord(3, 10));
    }
    return words.join(' ');
}

var GetItems = function (count) {
    var data = [];
    for (var i = 0; i < count; i++) {
        data.push({
            isLeft: (Math.random() > 0.5),
            content: `${i}: ${CreateContent()}`
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