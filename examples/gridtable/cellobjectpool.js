'use strict'
import GridTable from './../../plugins/gridtable-plugin.js';
import DragDeltaPlugin from './../../plugins/dragdelta-plugin.js';
import ObjectPoolPlugin from './../../plugins/objectpool-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var cellObjectsPool = new ObjectPoolPlugin(this);

        var newCellObject = function (scene, cell) {
            var container = cellObjectsPool.pop();
            if (container === null) {
                console.log(cell.index + ': create new gameboject')
                var bg = scene.add.graphics(0, 0)
                    .fillStyle(0x555555)
                    .fillRect(2, 2, 58, 58)
                    .setName('background');
                var txt = scene.add.text(5, 5, cell.index)
                    .setName('index');
                container = scene.add.container(0, 0, [bg, txt]);
            } else {
                console.log(cell.index + ': pop from pool')
                container.getByName('index').setText(cell.index);
            }

            return container;
        }

        var onCellVisible = function (cell) {
            cell.setContainer(newCellObject(this, cell));
            //console.log('Cell ' + cell.index + ' visible');
        };
        var onCellInvisible = function (cell) {
            var container = cell.popContainer();
            cellObjectsPool.push(container);
            console.log(cell.index + ': push to pool')
        }
        var table = this.add.rexGridTable(400, 300, 250, 400, {
            cellHeight: 60,
            cellWidth: 60,
            cellsCount: 100,
            columns: 4,
            cellVisibleCallback: onCellVisible.bind(this),
            cellInvisibleCallback: onCellInvisible.bind(this)
        });

        // draw bound
        this.add.graphics()
            .lineStyle(3, 0xff0000)
            .strokeRectShape(table.getBounds());

        // drag table content
        var dragDelta = new DragDeltaPlugin(table);
        dragDelta.on('dragdelta', function (pointer) {
            table.addTableOXY(pointer.dx, pointer.dy).updateTable();
        });

        this.add.text(10, 10, 'Destroy')
            .setInteractive()
            .on('pointerdown', function () {
                table.destroy();
            });
    }

    update() {}
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Demo
};

var game = new Phaser.Game(config);