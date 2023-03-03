import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

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
        this.rexUI.add.sizer({
            x: 400, y: 300,
            width: 300, height: 340,
            orientation: 'y',
            space: { left: 10, right: 10, top: 10, bottom: 10, item: 10 }
        })
            .addBackground(
                this.rexUI.add.roundRectangle({
                    radius: 10,
                    color: COLOR_DARK,
                    strokeColor: COLOR_LIGHT
                })
            )
            .add(
                this.rexUI.add.fileSelectorButton({
                    background: this.rexUI.add.roundRectangle({
                        color: COLOR_PRIMARY
                    }),
                    text: this.add.text(0, 0, 'Import image file'),
                    space: { left: 5, right: 5, top: 5, bottom: 5 },

                    accept: 'image/*'
                })
                    .on('select', function (files, fileSelectorButton) {
                        console.log(files);
                        var topUI = fileSelectorButton.getTopmostSizer();
                        var imageBox = topUI.getByName('imageBox', true);
                        var canvas = imageBox.image;
                        canvas.loadFromFilePromise(files[0])
                            .then(function () {
                                imageBox.resize(imageBox.width, imageBox.height);
                            })
                    }),
                { proportion: 0, expand: true }
            )
            .add(
                this.rexUI.add.imageBox({
                    image: this.rexUI.add.canvas()
                }).setName('imageBox'),
                { proportion: 1, expand: true }
            )
            .layout();
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
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }
};

var game = new Phaser.Game(config);