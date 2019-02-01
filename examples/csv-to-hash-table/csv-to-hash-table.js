import HashTablePlugin from '../../plugins/csvtohashtable-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var csvString = `name,hp,mp
Rex,100,20
Alice,300,40`;
        var table = this.plugins.get('rexHashTable').add();
        table.loadCSV(csvString);
        console.log(table.table);
        console.log(table.get('Rex', 'mp'));
    }

    update() {}
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