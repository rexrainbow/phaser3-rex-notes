import UIPlugin from 'rexTemplates/ui/ui-plugin.js';

const Random = Phaser.Math.Between;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var gridTable = this.rexUI.add.gridTable({
                x: 400,
                y: 300,

                background: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, 0x4e342e),

                table: {
                    width: 250,
                    height: 400,

                    cellWidth: 120,
                    cellHeight: 60,
                    columns: 2,
                },
                // slider: {
                //     track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, 0x260e04),
                //     thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, 0x7b5e57),
                // },

                createCellContainerCallback: function (cell) {
                    var scene = cell.scene,
                        width = cell.width,
                        height = cell.height,
                        item = cell.item,
                        index = cell.index;
                    return scene.rexUI.add.label({
                            width: width,
                            height: height,

                            background: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 0).setStrokeStyle(2, 0x260e04),
                            icon: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 10, item.color),
                            text: scene.add.text(0, 0, item.id),

                            space: {
                                icon: 10,
                                left: 15
                            }
                        })
                        .setOrigin(0)
                        .layout();
                },
                items: getItems(100)
            })
            .layout()
        //.drawBounds(this.add.graphics(), 0xff0000);
    }

    update() {}
}

var getItems = function (count) {
    var data = [];
    var startIdx = Random(0, 100);
    for (var i = 0; i < count; i++) {
        data.push({
            id: startIdx + i,
            color: Random(0, 0xffffff)
        });
    }
    return data;
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