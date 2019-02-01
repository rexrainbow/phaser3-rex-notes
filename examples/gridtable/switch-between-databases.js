import Phaser from 'phaser';
import GridTablePlugin from '../../plugins/gridtable-plugin.js';
import TouchStatePlugin from '../../plugins/touchstate-plugin.js';
import ContainerLitePlugin from '../../plugins/containerlite-plugin.js';

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
        var db0 = getDataBase(30);
        var db1 = getDataBase(40);
        var db2 = getDataBase(50);


        var config = {
            x: 400,
            y: 300,
            width: 250,
            height: 400,
            depth: -1,

            cellHeight: 60,
            cellWidth: 60,
            cellsCount: 0,
            columns: 4
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
            });

        this.add.text(0, 30, 'Db1')
            .setInteractive()
            .on('pointerup', function () {
                setDataBase(db1);
            });

        this.add.text(0, 60, 'Db2')
            .setInteractive()
            .on('pointerup', function () {
                setDataBase(db2);
            });

        setDataBase(db0);
    }

    update() {}
}

var getDataBase = function (count) {
    var data = [];
    var startIdx = Math.floor(Math.random() * 100);
    for (var i = 0; i < count; i++) {
        data.push({
            id: i
        });
    }
    return data;
}

var newTable = function (scene, config) {
    var table;

    var newCellObject = function (cell) {
        var scene = cell.scene;
        var database = table.database;
        var data = database[cell.index];
        var bg = scene.add.image(30, 30, 'bg')
            .setName('background')
            .setDisplaySize(56, 56)
            .setTint(0x333333);
        var txt = scene.add.text(5, 5, data.id)
            .setName('id');
        cell.setData('id', data.id);

        var container = scene.add.rexContainerLite(0, 0)
            .add(bg)
            .add(txt);
        return container;
    };

    config.cellVisibleCallback = function (cell) {
        cell.setContainer(newCellObject(cell));
        //console.log('Cell ' + cell.index + ' visible');
    };
    table = scene.make.rexGridTable(config);
    table.database = GetValue(config, 'database', []);
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