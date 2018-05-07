'use strict'
import GridTable from './../../plugins/gridtable-plugin.js';
import DragDeltaPlugin from './../../plugins/dragdelta-plugin.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('bg', 'assets/images/white-dot.png');
    }

    create() {
        var database = getDataBase();

        var config = {
            database: database,
            x: 400,
            y: 300,
            width: 300,
            height: 400,

            cellHeight: 60,
            cellWidth: 60,
            cellsCount: database.length,
            columns: 4
        };
        var table = newTable(this, config);

        // draw bound
        this.add.graphics()
            .lineStyle(3, 0xff0000)
            .strokeRectShape(table.getBounds());

    }

    update() {}
}

var getDataBase = function () {
    var data = [];
    for (var i = 0; i < 100; i++) {
        data.push({
            id: i + 133
        });
    }
    return data;
}

var newTable = function (scene, config) {
    var table;
    var database = GetValue(config, 'database', []);

    var newCellObject = function (scene, cell) {
        var data = database[cell.index];
        var bg = scene.add.image(30, 30, 'bg')
            .setName('background')
            .setDisplaySize(56, 56)
            .setTint(0x333333)
            .setInteractive()
            .on('pointerup', function () {
                console.log('click cell ' + cell.index);
                deleteCell(cell);
            });
        var txt = scene.add.text(5, 5, data.id)
            .setName('id');
        cell.setData('id', data.id);

        var container = scene.add.container(0, 0, [bg, txt]);
        return container;
    };

    var deleteCell = function (cell) {
        database.splice(cell.index, 1); // remove item from database
        refreshViewer();
    }

    var refreshViewer = function () {
        table.setCellsCount(database.length).updateTable();
        table.iterateVisibleCell(updateCellObject);
    };

    var updateCellObject = function (cell) {
        var data = database[cell.index];
        cell.getContainer().getByName('id').setText(data.id);
    };

    config.cellVisibleCallback = function (cell) {
        cell.setContainer(newCellObject(scene, cell));
        //console.log('Cell ' + cell.index + ' visible');
    };
    table = scene.make.rexGridTable(config);
    addDragContentBehavior(table);

    return table;
}

var addDragContentBehavior = function (table) {
    var dragDelta = new DragDeltaPlugin(table);
    dragDelta.on('dragdelta', function (pointer) {
        table.addTableOXY(pointer.dx, pointer.dy).updateTable();
    });
    return table;
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Demo
};

var game = new Phaser.Game(config);