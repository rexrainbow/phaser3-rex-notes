import 'phaser';
import CanvasPlugin from '../../plugins/canvas-plugin.js'

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
        this.print;
    }

    preload() {
    }

    create() {
        var htmlString = '<input type="file"/>';
        var domElement = this.add.dom(0, 0).setOrigin(0).createFromHTML(htmlString);
        var fileInputElement = domElement.node;

        var canvas = this.add.rexCanvas(400, 300);
        fileInputElement.addEventListener('change', function (e) {
            var file = e.target.files[0];
            var url = URL.createObjectURL(file);
            canvas.loadFromURLPromise(url)
                .then(function () {
                    URL.revokeObjectURL(url);
                })
        });
    }

    update() {
    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    dom: {
        createContainer: true
    },
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexCanvas',
            plugin: CanvasPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);