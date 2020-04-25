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
        var canvas = this.add.rexCanvas(400, 300);

        domElement.node.addEventListener('change', function (e) {
            var reader = new FileReader();
            reader.onload = function (event) {
                canvas.loadFromURL(event.target.result);
            }
            reader.readAsDataURL(e.target.files[0]);
        }, false);
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