import CSVToArrayPlugin from '../../plugins/csvtoarray-plugin.js';

class Demo extends Phaser.Scene {

    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        
    }

    create() {
        var csvString = `1,2,3
4,5,6
7,8,9`;
        var result = this.plugins.get('rexCSVToArray').convert(csvString);
        // result is a 3x3 number array
        console.log(result);
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
            key: 'rexCSVToArray',
            plugin: CSVToArrayPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);