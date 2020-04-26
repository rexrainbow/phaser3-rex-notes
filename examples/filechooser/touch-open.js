import FileChooserPlugin from '../../plugins/filechooser-plugin.js'

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        // Create a 0x0 file chooser, and it won't place in dom actually
        var fileChooser = this.add.rexFileChooser({
            accept: '.png'
        })
            .on('change', function (gameObject) {
                console.log(gameObject.files);
            })

        this.input.on('pointerup', function () {
            fileChooser.open();
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
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexFileChooser',
            plugin: FileChooserPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);