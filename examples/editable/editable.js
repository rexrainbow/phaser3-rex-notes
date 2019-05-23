import Editable from '../../plugins/behaviors/editable/Editable.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var editable;
        var printText = this.add.text(400, 300, 'abc', {
            color: 'yellow',
            fontSize: '24px',
            fixedWidth: 100,
            // fixedHeight: 100,
            backgroundColor: '#333333',
        })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', function () {
                editable = new Editable(printText);
                editable.open();
            });
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
    dom: {
        createContainer: true
    },
    scene: Demo,
};

var game = new Phaser.Game(config);