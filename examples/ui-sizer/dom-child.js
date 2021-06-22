import 'phaser';
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
        var content = 'Phaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. You can use JavaScript or TypeScript for development.'

        this.rexUI.add.sizer({
            x: 400, y: 300,
            width: 400, height: 40,
            orientation: 'y',
        })
            .addBackground(
                this.rexUI.add.roundRectangle(0, 0, 1, 1, 0, COLOR_PRIMARY)
            )
            .add(this.add.text(0, 0, 'Header'))
            .add(CreateDOM(this, content))
            .add(this.add.text(0, 0, 'Footer'))
            .layout()
    }

    update() { }
}

var CreateDOM = function (scene, content) {
    var dom = scene.add.dom().createFromHTML(content);
    dom.node.style.width = '400px';
    dom.updateSize();
    return dom;
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