import GridTablePlugin from '../../plugins/gridtable-plugin.js';

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
        var createNewCellContainer = function (cell) {
            var scene = cell.scene;
            var bg = scene.add.rectangle(0, 0, cell.width, cell.height, COLOR_PRIMARY)
                .setStrokeStyle(2, COLOR_LIGHT)
                .setOrigin(0)
                .setName('background');
            var txt = scene.add.text(5, 5, '')
                .setName('index');
            var cellContainer = scene.add.container(0, 0, [bg, txt]);
            return cellContainer;
        }

        var onCellVisible = function (cell, cellContainer) {
            if (cellContainer === null) {
                console.log(cell.index + ': create new cell-container');
                cellContainer = createNewCellContainer(cell);
            } else {
                console.log(cell.index + ': reuse cell-container');
            }

            cellContainer.getByName('index').setText(cell.index);

            cell.setContainer(cellContainer);
        };
        var table = this.add.rexGridTable(400, 300, 250, 400, {
            cellHeight: 60,
            cellWidth: 60,
            cellsCount: 100,
            columns: 4,
            cellVisibleCallback: onCellVisible.bind(this),
            reuseCellContainer: true,
            mask: {
                padding: 2,
            }
        });

        // draw bound
        this.add.graphics()
            .lineStyle(2, 0xff0000)
            .strokeRectShape(table.getBounds())
            .setDepth(1);

        // drag table content
        table
            .setInteractive()
            .on('pointermove', function (pointer) {
                if (!pointer.isDown) {
                    return;
                }
                var dx = pointer.x - pointer.prevPosition.x;
                var dy = pointer.y - pointer.prevPosition.y;
                table.addTableOXY(dx, dy).updateTable();
            });

        this.add.text(0, 580, 'Destroy')
            .setInteractive()
            .on('pointerdown', function () {
                table.destroy();
            });
    }

    update() { }
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
        global: [{
            key: 'rexGridTable',
            plugin: GridTablePlugin,
            start: true
        },
        ]
    }
};

var game = new Phaser.Game(config);