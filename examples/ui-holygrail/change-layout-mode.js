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
        var header = this.rexUI.add.label({
            height: 40,
            background: this.add.rectangle(0, 0, 0, 0, COLOR_MAIN),
            text: this.add.text(0, 0, 'Header'),
            align: 'center'
        })
        var footer = this.rexUI.add.label({
            height: 40,
            background: this.add.rectangle(0, 0, 0, 0, COLOR_MAIN),
            text: this.add.text(0, 0, 'Footer'),
            align: 'center'
        })
        var leftSide = this.rexUI.add.label({
            width: 200,
            background: this.add.rectangle(0, 0, 0, 0, COLOR_LIGHT),
            text: this.add.text(0, 0, 'Left'),
            align: 'center'
        })
        var rightSide = this.rexUI.add.label({
            width: 200,
            background: this.add.rectangle(0, 0, 0, 0, COLOR_LIGHT),
            text: this.add.text(0, 0, 'Right'),
            align: 'center'
        })
        var content = this.rexUI.add.label({
            background: this.add.rectangle(0, 0, 0, 0, COLOR_DARK),
            text: this.add.text(0, 0, 'Content'),
            align: 'center'
        })

        var layoutMode = 0;


        var ui = this.rexUI.add.holyGrail({
            x: 400, y: 300,
            width: 800 - 20, height: 600 - 20,

            layoutMode: layoutMode,

            header: header,
            leftSide: leftSide,
            content: content,
            rightSide: rightSide,
            footer: footer,

            space: {
                header: 10,
                footer: 10,
                leftSide: 10,
                rightSide: 10
            }
        })
            .layout()

        this.input.on('pointerdown', function () {
            layoutMode = (layoutMode + 1) % 4;
            ui
                .build({
                    layoutMode: layoutMode,

                    header: header,
                    leftSide: (layoutMode % 2) ? rightSide : leftSide,
                    content: content,
                    rightSide: (layoutMode % 2) ? leftSide : rightSide,
                    footer: footer,
                })
                .layout()
        })
    }

    update() { }
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