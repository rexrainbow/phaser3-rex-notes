import Phaser from 'phaser';
import GridTablePlugin from '../../plugins/gridtable-plugin.js';
import TouchStatePlugin from '../../plugins/touchstate-plugin.js';
import ContainerLitePlugin from '../../plugins/containerlite-plugin.js';

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

const GetValue = Phaser.Utils.Objects.GetValue;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var db0 = getDataBase(10);
        var db1 = getDataBase(20);
        var db2 = getDataBase(30);


        var config = {
            x: 400,
            y: 300,
            width: 250,
            height: 400,
            depth: -1,

            cellHeight: 60,
            cellWidth: 60,
            cellsCount: 0,
            columns: 4,
            mask: {
                padding: 2,
            }
        };
        var table = newTable(this, config);

        var setDataBase = function (database) {
            table.database = database;
            table.setCellsCount(database.length).setTableOY(0).updateTable(true);
        };

        this.add.text(0, 0, 'Db0')
            .setInteractive()
            .on('pointerup', function () {
                setDataBase(db0);
                console.log('Show db0');
            });

        this.add.text(0, 30, 'Db1')
            .setInteractive()
            .on('pointerup', function () {
                setDataBase(db1);
                console.log('Show db1');
            });

        this.add.text(0, 60, 'Db2')
            .setInteractive()
            .on('pointerup', function () {
                setDataBase(db2);
                console.log('Show db2');
            });

        setDataBase(db0);
    }

    update() { }
}

var getDataBase = function (count) {
    var data = [];
    for (var i = 0; i < count; i++) {
        data.push({
            id: i
        });
    }
    return data;
}

var newTable = function (scene, config) {
    var table;

    config.cellVisibleCallback = function (cell) {
        var scene = cell.scene;
        var database = table.database;
        var data = database[cell.index];
        var bg = scene.add.rectangle(0, 0, cell.width, cell.height, COLOR_PRIMARY)
            .setStrokeStyle(2, COLOR_LIGHT)
            .setOrigin(0);
        var txt = scene.add.text(5, 5, data.id);
        var container = scene.add.rexContainerLite(0, 0)
            .add(bg)
            .add(txt);

        cell.setContainer(container);
        //console.log('Cell ' + cell.index + ' visible');
    };
    table = scene.make.rexGridTable(config);
    table.database = GetValue(config, 'database', []);
    addDragContentBehavior(table);

    // draw bound
    scene.add.graphics()
        .lineStyle(2, 0xff0000)
        .strokeRectShape(table.getBounds())
        .setDepth(1);

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