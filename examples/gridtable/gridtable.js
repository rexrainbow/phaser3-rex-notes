'use strict'
import GridTablePlugin from 'rexPlugins/gridtable-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var newCellObject = function (scene, cell) {
            var bg = scene.add.graphics()
                .fillStyle(0x555555)
                .fillRect(2, 2, 58, 58);
            var txt = scene.add.text(5, 5, cell.index);
            var container = scene.add.container(0, 0, [bg, txt]);
            return container;
        }

        var onCellVisible = function (cell) {
            cell.setContainer(newCellObject(this, cell));
            //console.log('Cell ' + cell.index + ' visible');
        };
        var table = this.add.rexGridTable(400, 300, 250, 400, {
            cellHeight: 60,
            cellWidth: 60,
            cellsCount: 100,
            columns: 4,
            cellVisibleCallback: onCellVisible.bind(this),
            // mask: false
        });

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