import phaser from 'phaser/src/phaser.js';
import HashTablePlugin from '../../plugins/csvtohashtable-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var csvString = `name,coin
aa,100
bb,50
cc,10`;
        var table = this.plugins.get('rexHashTable').add();

        table.loadCSV(csvString);

        console.log(table.rowKeys);

        table.sortCol('coin', 'ascending');

        console.log(table.rowKeys);
    }

    update() { }
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
            key: 'rexHashTable',
            plugin: HashTablePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);