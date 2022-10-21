import phaser from 'phaser/src/phaser.js';
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
            width: 600,
            height: 500,

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
                    items = cell.items,
                    index = cell.index;
                if (cellContainer === null) {
                    cellContainer = CreateCellContainer(scene).setOrigin(0);
                    console.log(cell.index + ': create new cell-container');
                } else {
                    console.log(cell.index + ': reuse cell-container');
                }

                // Set properties from item value
                var previousItem = items[index - 1];
                var isTheSameName = (previousItem) ? (previousItem.name === item.name) : false;

                // Set mini width
                cellContainer.setMinWidth(width);

                // Set icon
                var iconGameObject = cellContainer.getElement('icon');
                if (isTheSameName) {
                    cellContainer.setChildVisible(iconGameObject, false);
                } else {
                    cellContainer.setChildVisible(iconGameObject, true);
                }

                // Set name
                var nameGameObject = cellContainer.getElement('name');
                if (isTheSameName) {
                    scene.rexUI.hide(nameGameObject);
                } else {
                    scene.rexUI.show(nameGameObject);
                    nameGameObject.setText(item.name);
                    cellContainer.setChildAlign(nameGameObject, (item.isLeft) ? 'left' : 'right');
                }

                // Set content
                cellContainer.getElement('content').setText(item.content);

                // Set rtl
                cellContainer.setRTL(!item.isLeft);

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
    var icon = scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, COLOR_LIGHT);
    var name = scene.add.text(0, 0, '');
    var content = scene.rexUI.add.label({
        orientation: 'x',
        background: scene.rexUI.add.roundRectangle(0, 0, 20, 10, 10).setStrokeStyle(2, 0xffffff),
        text: scene.rexUI.wrapExpandText(scene.add.text(0, 0, '')),
        expandTextWidth: true,
        space: { left: 10, right: 10, top: 10, bottom: 10 },
    })

    var messageSizer = scene.rexUI.add.sizer({
        orientation: 'y',
        space: { item: 10 }
    })
        .add(name)
        .add(content, { expand: true })

    return scene.rexUI.add.sizer({
        orientation: 'x',
        space: { item: 10 },
    })
        .add(icon, { align: 'top' })
        .add(messageSizer, { proportion: 1 })
        .addChildrenMap('icon', icon)
        .addChildrenMap('name', name)
        .addChildrenMap('content', content)
}

var CreateContent = function () {
    var words = [];
    for (var i = 0, cnt = Phaser.Math.Between(3, 15); i < cnt; i++) {
        words.push(GetRandomWord(3, 10));
    }
    return words.join(' ');
}

var GetItems = function (count) {
    var data = [];
    var names = ['AAA', 'BBB', 'CCC'];
    for (var i = 0; i < count; i++) {
        var name = Phaser.Utils.Array.GetRandom(names)
        data.push({
            isLeft: (name !== 'CCC'),
            name: name,
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