import 'phaser';
import ImageURILoaderPlugin from '../../plugins/imageuriloader-plugin.js';

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

        var scene = this;
        var onComplete = function () {
            scene.add.image(400, 300, 'img');
        }
        domElement.node.addEventListener('change', function (e) {
            var reader = new FileReader();
            reader.onload = function (event) {
                scene.load.rexImageURI('img', event.target.result);
                scene.load.once('complete', onComplete);
                scene.load.start();
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
            key: 'rexImageURILoader',
            plugin: ImageURILoaderPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);