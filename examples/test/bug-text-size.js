import phaser from 'phaser/src/phaser.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
     
    }

    create() {
        var size = 58;
        var textObject = this.add.text(0, 0, '', {
            fontFamily: 'Arial',
            fontSize: size
        });

        textObject.setText('Options')
    }

    update() { }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    render: { mipmapFilter: 'LINEAR_MIPMAP_LINEAR' },
    backgroundColor: 0x333333,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo,
};

var game = new Phaser.Game(config);