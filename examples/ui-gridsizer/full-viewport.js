import 'phaser';
import UIPlugin from '../../templates/ui/ui-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        // Fix width, fix height
        var subWin00 = this.rexUI.add.roundRectangle(0, 0, 400, 300, 0, 0x4F6623);
        // Fix width, stretch height
        var subWin01 = this.rexUI.add.roundRectangle(0, 0, 400, 600, 0, 0x799B34);
        // Stretch width, fix height
        var subWin10 = this.rexUI.add.roundRectangle(0, 0, 800, 300, 0, 0xDAFF8F);
        // Stretch width, stretch height
        var subWin11 = this.rexUI.add.roundRectangle(0, 0, 800, 600, 0, 0x98A976);
        var win = this.rexUI.add.gridSizer({
            column: 2, columnProportions: [0, 1],
            row: 2, rowProportions: [0, 1]
        })
            .add(subWin00, 0, 0)
            .add(subWin01, 0, 1)
            .add(subWin10, 1, 0)
            .add(subWin11, 1, 1)

        var print = this.add.text(0, 0, '');
        var ResizeWindow = function () {
            var viewport = this.rexUI.viewport;
            win
                .setPosition(viewport.centerX, viewport.centerY)
                .setMinSize(viewport.width, viewport.height)
                .layout();

            print
                .setPosition(viewport.x + 10, viewport.y + 10)
                .setText([
                    `${subWin00.width}x${subWin00.height}\n`,
                    `${subWin01.width}x${subWin01.height}\n`,
                    `${subWin10.width}x${subWin10.height}\n`,
                    `${subWin11.width}x${subWin11.height}`
                ])
        }
        this.scale.on('resize', ResizeWindow, this);
        ResizeWindow.call(this);
    }

    update() { }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.ENVELOP,
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