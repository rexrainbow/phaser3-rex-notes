import FileChooserPlugin from '../../plugins/filechooser-plugin.js'

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var print = this.add.text(0, 0, 'Click rectangle to select a file');

        // Create cover
        var cover = this.add.rectangle(400, 300, 100, 40).setStrokeStyle(2, 0xff0000);
        this.add.text(400, 300, 'Open').setOrigin(0.5);
        // Create a transparent file chooser
        this.add.rexFileChooser({
            accept: 'image/*'
        })
            .syncToGameObject(cover)
            .on('select', function (gameObject, files) {
                if (files.length) {
                    console.log(files[0])
                    print.text = files[0].name;
                } else {
                    print.text = 'No file selected'
                }
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