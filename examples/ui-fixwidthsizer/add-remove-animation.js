import 'phaser';
import UIPlugin from '../../templates/ui/ui-plugin.js';
import MoveTo from '../../plugins/moveto';

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
        this.print = this.add.text(0, 0, '');

        var panel = this.rexUI.add.fixWidthSizer({
            x: 400, y: 300,
            width: 600, height: 400,

            space: {
                left: 3,
                right: 3,
                top: 3,
                bottom: 3,
                item: 8,
                line: 8,
            }
        })
            .addBackground(this.rexUI.add.roundRectangle(0, 0, 2, 2, 10, COLOR_PRIMARY))
            .layout()
        //.drawBounds(this.add.graphics(), 0xff0000);

        this.add.text(0, 200, 'Add word')
            .setInteractive()
            .on('pointerdown', function () {
                AddWord(panel, GetRandomWord(Phaser.Math.Between(2, 6)));
            })

        for (var i = 0; i < 10; i++) {
            AddWord(panel, GetRandomWord(Phaser.Math.Between(2, 6)));
        }
    }

    update() { }
}

var AddWord = function (panel, word) {
    var scene = panel.scene;
    var child = scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 10, COLOR_DARK),
        text: scene.add.text(0, 0, word),
        space: {
            left: 5, right: 5, top: 5, bottom: 5
        }
    })
        .setRandomPosition()

    var moveTo = new MoveTo(child);

    child
        .on('postlayout', function (prevState, child, parent) {
            moveTo.moveFrom(prevState.x, prevState.y);
        })
        .setInteractive()
        .once('pointerdown', function () {
            panel.remove(child).layout();
            child.fadeOutDestroy(500);
            var x = child.x, y = child.y;
            child.setRandomPosition();
            moveTo.moveFrom(x, y);
        })

    panel.add(child).layout();
    return panel;
};

const RandomItem = Phaser.Utils.Array.GetRandom;
const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
var GetRandomWord = function (wordLength) {
    var s = '';
    for (var j = 0; j < wordLength; j++) {
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