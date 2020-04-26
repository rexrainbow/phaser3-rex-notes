import FileChooserPlugin from '../../plugins/filechooser-plugin.js'

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        // Create cover
        this.add.rectangle(400, 300, 100, 40).setStrokeStyle(2, 0xff0000);
        this.add.text(400, 300, 'Open').setOrigin(0.5);
        // Create a transparent file chooser
        this.add.rexFileChooser(400, 300, 100, 40, {
            accept: '.png'
        })
            .on('change', function (gameObject) {
                console.log(gameObject.files);
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
        global: [{
            key: 'rexFileChooser',
            plugin: FileChooserPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);