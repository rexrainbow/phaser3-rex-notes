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
        var csvString = `name,hp,mp
Rex,100,20
Alice,300,40`;
        var table0 = this.plugins.get('rexHashTable').add();
        table0.loadCSV(csvString);

        table0.set('Rex', 'hp', 80);
        var saveData = table0.toJSON();
        console.log(saveData)

        var table1 = this.plugins.get('rexHashTable').add();
        table1.resetFromJSON(saveData);
        console.log(table1.get('Rex', 'hp'))

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