import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_MAIN = 0x4e342e;
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
        var scrollablePanel = this.rexUI.add.scrollablePanel({
            x: 400,
            y: 300,
            width: 400,
            height: 400,

            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 10, COLOR_MAIN),

            panel: {
                child: CreatePanel(this),

                mask: {
                    padding: 1
                },
            },

            sliderX: {
                track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
                thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
            },

            sliderY: {
                track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
                thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
            },

            space: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,

                sliderX: 10,
                sliderY: 10
            }
        })
            .layout()

        AddDragCornerController(scrollablePanel)

        this.add.text(0, 580, 'Drag top-left or bottom-right corner')

    }

    update() { }
}

var CreatePanel = function (scene) {
    var canvas = scene.rexUI.add.canvas(0, 0, 1000, 1000)
        .updateTexture(function (canvasElem, context) {
            const grd = context.createLinearGradient(0, 0, 1000, 1000);
            grd.addColorStop(0, 'black');
            grd.addColorStop(1, 'white');
            context.fillStyle = grd;
            context.fillRect(0, 0, 1000, 1000);
        })

    return canvas;
}

var AddDragCornerController = function (sizer) {
    var scene = sizer.scene;

    var bottomRighterController = scene.add.rectangle(sizer.right, sizer.bottom, 30, 30, 0x333333);
    var topLeftController = scene.add.rectangle(sizer.left, sizer.top, 30, 30, 0x333333);

    sizer.pin(bottomRighterController)
    sizer.pin(topLeftController)

    bottomRighterController
        .setInteractive({ draggable: true })
        .on('drag', function (pointer, dragX, dragY) {
            var topX = sizer.left,
                topY = sizer.top;
            var width = dragX - topX,
                height = dragY - topY;

            sizer.setChildPosition(bottomRighterController, dragX, dragY);
            sizer.setChildPosition(topLeftController, topX, topY);

            sizer.setMinSize(width, height).layout();

            sizer.left = topX;
            sizer.top = topY;
        })


    topLeftController
        .setInteractive({ draggable: true })
        .on('drag', function (pointer, dragX, dragY) {
            sizer.x += dragX - topLeftController.x;
            sizer.y += dragY - topLeftController.y;
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