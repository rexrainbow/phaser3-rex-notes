import phaser from 'phaser/src/phaser.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('tiles', 'assets/tilemaps/hexagon/tileset-y.png');
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/hexagon/mapdata-y.json');
    }

    create() {
        var map = this.add.tilemap('map');
        var tileset = map.addTilesetImage('tileset', 'tiles');
        map.createLayer('Calque 1', tileset);

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
    scene: Demo
};

var game = new Phaser.Game(config);