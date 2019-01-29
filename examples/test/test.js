class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        this.input
            .on('pointerup', function () {
                console.log('pointerup');
            })
            .on('pointerupoutside', function () {
                console.log('pointerupoutside');
            })
            .on('gameout', function () {
                console.log('gameout');
            })
    }

    update() {}
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Demo,
    backgroundColor: 0x333333
};

var game = new Phaser.Game(config);