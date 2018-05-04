'use strict'
import GridTable from './../../plugins/gridtable-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        debugger
        var newCellObject = function (scene, cell) {
            var bg = scene.add.graphics(0, 0)
                .fillStyle(0x333333)
                .fillRect(2, 2, 28, 28);
            var txt = scene.add.text(5, 5, cell.index.toString());
            var container = scene.add.container(0, 0, [bg, txt]);
            return container;
        }

        var onCellVisible = function (cell) {
            cell.setContainer(newCellObject(this, cell));
            //console.log('Cell ' + cell.index + ' visible');
        };
        var onCellInvisible = function (cell) {
            // var container = cell.popContainer();
            //console.log('Cell ' + cell.index + ' invisible');
        }
        var table = this.add.rexGridTable(100, 200, 200, 200, {
                cellHeight: 30,
                cellWidth: 30,
                totalcells: 100,
                columns: 4,
                cellVisibleCallback: onCellVisible.bind(this),
                cellInvisibleCallback: onCellInvisible.bind(this)
            })
            .setInteractive()
            .on('drag', function (pointer, dragX, dragY) {
                table.tableOX = dragX - pointer.downX;
                table.tableOY = dragY - pointer.downY;
            })
        this.input.setDraggable(table);

        // draw bound
        var topLeftP = table.getTopLeft();
        this.add.graphics()
            .lineStyle(1, 0xcccccc)
            .strokeRect(topLeftP.x, topLeftP.y, table.width, table.height);

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