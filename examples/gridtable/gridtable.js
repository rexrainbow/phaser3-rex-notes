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
        var callback = function (gridTable, idx) {
            gridTable.addObjectToCell(
                idx,
                this.add.text(0, 0, idx.toString())
            );
        }
        var table = this.add.rexGridTable(100, 200, 50, 100, {
            cellVisibleCallback: callback.bind(this)
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