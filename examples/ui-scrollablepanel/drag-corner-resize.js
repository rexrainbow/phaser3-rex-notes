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
        var scrollablePanel = this.rexUI.add.scrollablePanel({
            x: 400,
            y: 300,
            width: 400,
            height: 400,

            scrollMode: 0,

            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 10, COLOR_PRIMARY),

            panel: {
                child: CreatePanel(this),

                mask: {
                    padding: 1
                },
            },

            slider: {
                track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
                thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
            },

            space: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,

                panel: 10,
            }
        })
            .layout()

        AddDragCornerController(scrollablePanel)

        this.add.text(0, 580, 'Drag top-left or bottom-right corner')

    }

    update() { }
}

var content = `Phaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. You can use JavaScript or TypeScript for development.
Along with the fantastic open source community, Phaser is actively developed and maintained by Photon Storm. As a result of rapid support, and a developer friendly API, Phaser is currently one of the most starred game frameworks on GitHub.
Thousands of developers from indie and multi-national digital agencies, and universities worldwide use Phaser. You can take a look at their incredible games.`;

var CreatePanel = function (scene) {
    var sizer = scene.rexUI.add.fixWidthSizer({
        space: {
            left: 3,
            right: 3,
            top: 3,
            bottom: 3,
            item: 8,
            line: 8,
        }
    })
    var lines = content.split('\n');
    for (var li = 0, lcnt = lines.length; li < lcnt; li++) {
        var words = lines[li].split(' ');
        for (var wi = 0, wcnt = words.length; wi < wcnt; wi++) {
            sizer.add(
                scene.add.text(0, 0, words[wi], {
                    fontSize: 18
                })
            );
        }
        if (li < (lcnt - 1)) {
            sizer.addNewLine();
        }
    }

    return sizer;
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