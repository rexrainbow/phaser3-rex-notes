'use strict'
import GridTable from './../../plugins/gridtable-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var newCellObject = function (scene, cell) {
            var bg = scene.add.graphics(0, 0)
                .fillStyle(0x555555)
                .fillRect(2, 2, 58, 58);
            var txt = scene.add.text(5, 5, cell.index.toString());
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
            totalcells: 100,
            columns: 4,
            cellVisibleCallback: onCellVisible.bind(this),
        });

        // draw bound
        this.add.graphics()
            .lineStyle(1, 0xcccccc)
            .strokeRectShape(table.getBounds());

        // drag table content
        table.setInteractive();
        table.on('pointerdown', function(pointer){
            table.setData('preX', pointer.x);
            table.setData('preY', pointer.y);
        });
        table.on('pointermove', function(pointer){
            if (table.getData('preX') === undefined) {
                return;
            }
            var dx = pointer.x - table.getData('preX');
            var dy = pointer.y - table.getData('preY');
            table.addTableOXY(dx, dy).updateTable();
            table.setData('preX', pointer.x);
            table.setData('preY', pointer.y);
        });
        table.on('pointerup', function(pointer){
            table.setData('preX', undefined);
            table.setData('preY', undefined);
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