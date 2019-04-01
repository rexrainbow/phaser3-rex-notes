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
        var scrollableBlock = this.rexUI.add.scrollableBlock({
                x: 400,
                y: 300,
                width: 300,
                height: 400,

                scrollMode: 0,
                child: createGrid(this, 3, 20)
            })
            .layout()
            .setChildOY(-50)
            .drawBounds(this.add.graphics(), 0xff0000);
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
                createItem(scene), // child
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
var createItem = function (scene) {
    var text = genText();
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 0, COLOR_PRIMARY)
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

const RandomInt = Phaser.Math.Between;
const RandomItem = Phaser.Utils.Array.GetRandom;
const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
var genText = function () {
    var s = '';
    for (var j = 0, jcnt = RandomInt(2, 4); j < jcnt; j++) {
        s += RandomItem(possible);
    }
    return s;
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