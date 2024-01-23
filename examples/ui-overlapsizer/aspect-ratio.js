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

    preload() {
        this.load.image('card', 'assets/images/card2.png');
    }

    create() {
        var ui = this.rexUI.add.overlapSizer(400, 300, 300, 300)
            .addBackground(this.rexUI.add.roundRectangle(0, 0, 0, 0, 0, COLOR_MAIN))
            .add(
                this.add.image(0, 0, 'card'), // child
                {
                    aspectRatio: true,
                    // align: 'right'
                }
            )
            .layout()

        AddDragCornerController(ui);
    }

    update() { }
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