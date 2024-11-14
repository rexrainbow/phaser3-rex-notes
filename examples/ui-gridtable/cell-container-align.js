import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_MAIN = 0x4e342e;
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
        var testMode = 0;

        var HorizontalAlignTest = function (cell) {
            var scene = cell.scene;
            var bg = scene.add.rectangle(0, 0, 200, cell.height, COLOR_MAIN)
                .setStrokeStyle(2, COLOR_LIGHT);
            
            cell.setCellContainerAlign((cell.index % 2) ? 'left' : 'right');
            //console.log('Cell ' + cell.index + ' visible');
            return bg
        }
        var VerticalAlignTest = function (cell) {
            var scene = cell.scene;
            var bg = scene.add.rectangle(0, 0, cell.width, cell.height - 20, COLOR_MAIN)
                .setStrokeStyle(2, COLOR_LIGHT);

            cell.setCellContainerAlign((cell.index % 2) ? 'top' : 'bottom');
            //console.log('Cell ' + cell.index + ' visible');
            return bg
        }

        var gridTable = this.rexUI.add.gridTable({
            x: 400,
            y: 300,
            width: 300,
            height: 420,

            scrollMode: 0,

            background: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, 0x333333),

            table: {
                cellHeight: 80,

                columns: 1,

                mask: {
                    padding: 2,
                },

                reuseCellContainer: false,
            },

            slider: {
                track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
                thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
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

            createCellContainerCallback: (testMode == 0) ? HorizontalAlignTest : VerticalAlignTest,
            items: getItems(100)
        })
            .layout()
        //.drawBounds(this.add.graphics(), 0xff0000);
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