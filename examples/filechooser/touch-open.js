import 'phaser';
import FileChooserPlugin from '../../plugins/filechooser-plugin.js';

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
        this.add.rectangle(400, 300, 200, 200, 0x0000ff)
            .setInteractive()
            .on('pointerdown', function () {
                scene.plugins.get('rexFileChooser').open({ accept: 'image/*' })
                    .then(function (result) {
                        var files = result.files;
                        if (files.length) {
                            console.log(files[0])
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
    dom: {
        createContainer: true
    },
    scene: Demo,
    plugins: {
        global: [
            {
                key: 'rexFileChooser',
                plugin: FileChooserPlugin,
                start: true
            }
        ]
    }
};

var game = new Phaser.Game(config);