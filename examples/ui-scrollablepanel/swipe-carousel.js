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
        var cellWidth = 300;
        var scrollablePanel = this.rexUI.add.scrollablePanel({
            x: 400,
            y: 300,

            scrollMode: 1,

            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 10, COLOR_MAIN),

            panel: {
                width: cellWidth,
                height: 100,
                child: CreateSizer(this, 20, cellWidth),
                mask: {
                    mask: true,
                    padding: 1,
                }
            },

            snapStep: cellWidth,

            scroller: {
                // pointerOutRelease: false,
                slidingDeceleration : 30000
            },

            mouseWheelScroller: {
                focus: false,
            },

            space: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,
            }
        })
            .layout()
        //.drawBounds(this.add.graphics(), 0xff0000);
    }

    update() { }
}

var CreateSizer = function (scene, amount, cellWidth) {
    var sizer = scene.rexUI.add.sizer({
        orientation: 'x'
    })
    for (var i = 0; i < amount; i++) {
        sizer.add(
            CreateItem(scene, i, cellWidth - 20), // child
            {
                padding: { left: 10, right: 10 },
                proportion: 0,
                expand: true
            }
        )
    }
    return sizer;
}

const Random = Phaser.Math.Between;
var CreateItem = function (scene, index, width) {
    var item = scene.rexUI.add.label({
        width: width,
        background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 0, Random(0, 0xffffff)),
        text: scene.add.text(0, 0, index, {
            fontSize: 30
        }),
        align: 'center',
        space: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10,
        }
    })
    return item;
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