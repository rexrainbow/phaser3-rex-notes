import Papa from 'papaparse/papaparse.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var csvString = `,2,3
4,5,6
7,8,9`;
        var data = Papa.parse(csvString, {
            dynamicTyping: true
        });
        console.log(data);  // a 3x3 array

        csvString = `name,hp,mp
4,5,6
7,8,9`;
        data = Papa.parse(csvString, {
            dynamicTyping: true,
            header: true
        });
        console.log(data);  // an object array with 2 rows
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
    scene: Demo
};

var game = new Phaser.Game(config);