class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.tilemapTiledJSON('hexmap', 'assets/tilemaps/maps/hexagonal-mini.json');
    }

    create() {
        debugger;
        var map = this.add.tilemap('hexmap');
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