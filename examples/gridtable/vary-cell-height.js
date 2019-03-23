import GridTablePlugin from '../../plugins/gridtable-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var newCellObject = function (cell) {
            var scene = cell.scene;
            var cellIdx = cell.index;
            // cell.height = (cellIdx % 2) ? 40 : 80;  // se height of visible cell

            var color = (cellIdx % 2) ? 0x40241a : 0x9c786c;
            var bg = scene.add.rectangle(0, 0, cell.width, cell.height, color, 0.5)
                .setStrokeStyle(2, 0x9c786c)
                .setOrigin(0);
            var txt = scene.add.text(5, 5, cellIdx);
            var container = scene.add.container(0, 0, [bg, txt]);
            return container;
        }

        var onCellVisible = function (cell) {
            cell.setContainer(newCellObject(cell));
            //console.log('Cell ' + cell.index + ' visible');
        };
        var table = this.add.rexGridTable(400, 300, 250, 400, {
            cellWidth: 240,
            cellHeight: 60,
            cellsCount: 20,
            columns: 1,
            cellVisibleCallback: onCellVisible.bind(this),
        });

        // set height of all cells
        for (var i = 0, cnt = table.cellsCount; i < cnt; i++) {
            var cellHeight = (i % 2) ? 40 : 80;
            table.setCellHeight(i, cellHeight);
        }
        table.updateTable(true); // refresh visible cells

        // draw bound
        this.add.graphics()
            .lineStyle(3, 0xff0000)
            .strokeRectShape(table.getBounds());

        // drag table content
        table.setInteractive();
        table.on('pointermove', function (pointer) {
            if (!pointer.isDown) {
                return;
            }
            var dx = pointer.x - pointer.prevPosition.x;
            var dy = pointer.y - pointer.prevPosition.y;
            table.addTableOXY(dx, dy).updateTable();
        });
    }

    update() {}
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
        }]
    }
};

var game = new Phaser.Game(config);