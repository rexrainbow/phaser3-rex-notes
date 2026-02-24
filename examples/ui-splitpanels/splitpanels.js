import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_MAIN = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

const GetValue = Phaser.Utils.Objects.GetValue;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

    }

    preload() {

    }

    create() {
        var ui = this.rexUI.add.splitPanels({
            x: 400, y: 300,
            width: 600, height: 360,

            space: {
                item: 10
            },

            header: this.rexUI.add.label({
                height: 30,
                background: this.rexUI.add.roundRectangle(0, 0, 20, 20, 0, COLOR_DARK),
                text: this.add.text(0, 0, 'Header'),
            }),
            
            footer: this.rexUI.add.label({
                height: 30,
                background: this.rexUI.add.roundRectangle(0, 0, 20, 20, 0, COLOR_DARK),
                text: this.add.text(0, 0, 'Footer'),
            }),

            leftPanel: this.add.rectangle(0, 0, 1, 1, COLOR_LIGHT),
            rightPanel: CreateRightPanel(this),
            splitter: this.add.rectangle(0, 0, 15, 1).setStrokeStyle(3, 0xff0000),

            minLeftPanelWidth: 100,
            minRightPanelWidth: 200,

            splitRatio: 0.25
        })
            .layout()


        var print = this.add.text(0, 0, '');
        ui
            .on('splitter.dragstart', function (splitter, splitRatio) {
                splitter.setFillStyle(0xff0000)
            })
            .on('splitter.dragend', function (splitter, splitRatio) {
                splitter.setFillStyle()
            })
            .on('splitter.drag', function (splitter, splitRatio) {
                print.text = splitRatio;
            })

    }

    update() { }
}

const content = `Phaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. You can use JavaScript or TypeScript for development.`;
var CreateRightPanel = function (scene) {
    return scene.rexUI.add.textArea({
        text: scene.rexUI.add.BBCodeText(0, 0, '', { fontSize: 24 }),
        slider: {
            track: scene.rexUI.add.roundRectangle(0, 0, 15, 0, 10, COLOR_MAIN),
            thumb: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
            hideUnscrollableSlider: true,
            // adaptThumbSize: true,
        },

        content: content
    })
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
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }
};

var game = new Phaser.Game(config);