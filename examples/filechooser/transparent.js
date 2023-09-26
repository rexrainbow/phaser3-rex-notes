import phaser from 'phaser/src/phaser.js';
import FileChooserPlugin from '../../plugins/filechooser-plugin.js';
import CanvasPlugin from '../../plugins/canvas-plugin.js';
import FitTo from '../../plugins/utils/size/FitTo.js';

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        // Create cover
        var cover = this.add.rectangle(400, 300, 500, 500, COLOR_PRIMARY).setStrokeStyle(2, COLOR_LIGHT);
        // Create canvas
        var canvas = this.add.rexCanvas(400, 300, 300, 300).fill('black');
        canvas.fitTo = (function (parent) {
            var newSize = FitTo(this, parent, false, true);
            this.setDisplaySize(newSize.width, newSize.height);
        }).bind(canvas)

        // Create a transparent file chooser
        this.add.rexFileChooser({
            accept: 'image/*'
        })
            .syncTo(cover)
            .on('change', function (gameObject) {
                var files = gameObject.files;
                if (files.length === 0) {
                    return;
                }

                canvas.loadFromFilePromise(files[0])
                    .then(function () {
                        canvas.fitTo(cover);
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
            },
            {
                key: 'rexCanvas',
                plugin: CanvasPlugin,
                start: true
            }
        ]
    }
};

var game = new Phaser.Game(config);