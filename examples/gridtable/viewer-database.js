'use strict'

import Phaser from 'phaser';
import GridTablePlugin from 'rexPlugins/gridtable-plugin.js';
import TouchStatePlugin from 'rexPlugins/touchstate-plugin.js';
import ContainerLitePlugin from 'rexPlugins/containerlite-plugin.js';

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
            width: 250,
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

        //table.updateTable(true);

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
            .setTint(0x333333);
        var txt = scene.add.text(5, 5, data.id)
            .setName('id')
            .setInteractive()
            .on('pointerup', function () {
                console.log('click cell ' + cell.index);
                deleteCell(cell);
            });
        cell.setData('id', data.id);

        var container = scene.add.rexContainerLite(0, 0)
            .add(bg)
            .add(txt);
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
    table.depth = -1;
    addDragContentBehavior(table);

    return table;
}

var addDragContentBehavior = function (table) {
    table.touchState = table.scene.plugins.get('rexTouchState').add(table)
        .on('touchmove', function (pointer) {
            table.addTableOXY(this.dx, this.dy).updateTable();
        });
    return table;
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
            },
            {
                key: 'rexTouchState',
                plugin: TouchStatePlugin,
                start: true
            },
            {
                key: 'rexContainerLite',
                plugin: ContainerLitePlugin,
                start: true
            }
        ]
    }
};

var game = new Phaser.Game(config);