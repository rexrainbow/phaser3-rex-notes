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
        this.rexUI.add.fixWidthSizer({
            x: 400, y: 300,
            width: 250, height: undefined,
        })
            .addBackground(this.rexUI.add.roundRectangle(0, 0, 10, 10, 0, COLOR_DARK))
            .add(this.add.text(0, 0, 'Nickname', { fontSize: 18 }))
            .addNewLine()
            .add(this.rexUI.add.inputText({
                width: 200, height: 40,
            }).setText('AAAAAAAAAAAAAAAAAAA'))
            .addNewLine()
            .add(this.add.text(0, 0, 'Nickname', { fontSize: 18 }))
            .addNewLine()
            .add(this.rexUI.add.inputText({
                width: 200, height: 40,
            }).setText('AAAAAAAAAAAAAAAAAAA'))
            .add(this.add.text(0, 0, 'Nickname', { fontSize: 18 }))
            .addNewLine()
            .add(this.rexUI.add.inputText({
                width: 200, height: 40,
            }).setText('AAAAAAAAAAAAAAAAAAA'))
            .layout()
            .drawBounds(this.add.graphics(), 0xff0000)
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