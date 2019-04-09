import UIPlugin from '../../templates/ui/ui-plugin.js';

const Random = Phaser.Math.Between;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var scrollMode = 0; // 0:vertical, 1:horizontal
        var gridTable = this.rexUI.add.gridTable({
            x: 400,
            y: 300,
            width: (scrollMode === 0) ? 300 : 400,
            height: (scrollMode === 0) ? 400 : 300,

            scrollMode: scrollMode,

            background: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, 0x4e342e),

            table: {
                cellWidth: (scrollMode === 0) ? undefined : 60,
                cellHeight: (scrollMode === 0) ? 60 : undefined,

                columns: 2,

                mask: {
                    padding: 2,
                },
            },

            slider: {
                track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, 0x260e04),
                thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, 0x7b5e57),
            },

            space: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,

                table: 10,
            },

            createCellContainerCallback: function (cell) {
                var scene = cell.scene,
                    width = cell.width,
                    height = cell.height,
                    item = cell.item,
                    index = cell.index;
                return scene.rexUI.add.label({
                    width: width,
                    height: height,

                    orientation: scrollMode,
                    background: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 0).setStrokeStyle(2, 0x260e04),
                    icon: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 10, item.color),
                    text: scene.add.text(0, 0, item.id),

                    space: {
                        icon: 10,
                        left: (scrollMode === 0) ? 15 : 0,
                        top: (scrollMode === 0) ? 0 : 15,
                    }
                });
            },
            items: getItems(100)
        })
            .layout();


        var tween = this.tweens.add({
            targets: gridTable,
            t: '+=1',             // '+=100'
            ease: 'Back',         // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 5000,
            repeat: 0,            // -1: infinity
            yoyo: false
        });

    }

    update() { }
}

var getItems = function (count) {
    var data = [];
    for (var i = 0; i < count; i++) {
        data.push({
            id: i,
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