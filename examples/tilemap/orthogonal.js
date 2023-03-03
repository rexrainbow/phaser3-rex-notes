import phaser from 'phaser/src/phaser.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {       
        this.load.image('tiles', 'assets/tilemaps/orthogonal/tmw_desert_spacing.png');
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/orthogonal/desert.json');
    }

    create() {
        var map = this.add.tilemap('map');
        var tiles = map.addTilesetImage('Desert', 'tiles');
        map.createLayer('Ground', tiles);
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