import Open from '../../plugins/behaviors/filechooser/Open.js'

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var print = this.add.text(0, 0, 'Click rectangle to select a file');

        var scene = this;
        this.add.rectangle(400, 300, 30, 30, 0x0000ff)
            .setInteractive()
            .on('pointerdown', function () {
                Open(scene, { accept: '.png' })
                    .then(function (result) {
                        var files = result.files;
                        if (files.length) {
                            print.text = files[0].name;
                        } else {
                            print.text = 'No file selected'
                        }
                    })
            })
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