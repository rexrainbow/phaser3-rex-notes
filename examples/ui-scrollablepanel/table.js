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

    preload() {}

    create() {
        var scrollablePanel = this.rexUI.add.scrollablePanel({
                x: 400,
                y: 300,
                width: 350,
                height: 460,

                scrollMode: 0,

                background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 10, COLOR_PRIMARY),

                panel: {
                    child: createGrid(this, 3, 20),
                    mask: {
                        mask: true,
                        padding: 1,
                    }
                },

                slider: {
                    track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
                    thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
                },

                header: this.rexUI.add.label({
                    height: 30,
    
                    orientation: 0,
                    background: this.rexUI.add.roundRectangle(0, 0, 20, 20, 0, COLOR_DARK),
                    text: this.add.text(0, 0, 'Header'),
                }),
    
                footer: this.rexUI.add.label({
                    height: 30,
    
                    orientation: 0,
                    background: this.rexUI.add.roundRectangle(0, 0, 20, 20, 0, COLOR_DARK),
                    text: this.add.text(0, 0, 'Footer'),
                }),

                space: {
                    left: 10,
                    right: 10,
                    top: 10,
                    bottom: 10,

                    panel: 10,
                    header: 10,
                    footer: 10,
                }
            })
            .layout()
        //.drawBounds(this.add.graphics(), 0xff0000);
    }

    update() {}
}

var createGrid = function (scene, col, row) {
    var sizer = scene.rexUI.add.gridSizer({
        column: col,
        row: row,

        columnProportions: 1,
    })
    for (var i = 0; i < col; i++) {
        for (var j = 0; j < row; j++) {
            sizer.add(
                createItem(scene, i, j), // child
                i, // columnIndex
                j, // rowIndex
                'center', // align
                0, // paddingConfig
                true, // expand
            )
        }
    }

    return sizer;
}

const Random = Phaser.Math.Between;
var createItem = function (scene, colIdx, rowIdx) {
    var text = colIdx + ',' + rowIdx;
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 0, undefined)
            .setStrokeStyle(2, COLOR_LIGHT, 1),
        text: scene.add.text(0, 0, text, {
            fontSize: 18
        }),
        icon: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 10, Random(0, 0xffffff)),
        space: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10,

            icon: 10,
        }
    });
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