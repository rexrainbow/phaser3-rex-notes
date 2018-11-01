import UIPlugin from 'rexTemplates/ui/ui-plugin.js';

const Random = Phaser.Math.Between;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var tabs = this.rexUI.add.tabs({
                x: 400,
                y: 300,

                background: this.rexUI.add.roundRectangle(0, 0, 10, 10, 0, 0x001064),

                panel: this.rexUI.add.roundRectangle(0, 0, 400, 400, 0, 0x283593),

                leftButtons: [
                    this.rexUI.add.roundRectangle(0, 0, 100, 50, 0, 0x5f5fc4),
                    this.rexUI.add.roundRectangle(0, 0, 100, 50, 0, 0x5f5fc4),
                    this.rexUI.add.roundRectangle(0, 0, 100, 50, 0, 0x5f5fc4)
                ],

                rightButtons: [
                    this.rexUI.add.roundRectangle(0, 0, 100, 50, 0, 0x5f5fc4),
                    this.rexUI.add.roundRectangle(0, 0, 100, 50, 0, 0x5f5fc4),
                    this.rexUI.add.roundRectangle(0, 0, 100, 50, 0, 0x5f5fc4)
                ],

                topButtons: [
                    this.rexUI.add.roundRectangle(0, 0, 100, 50, 0, 0x5f5fc4),
                    this.rexUI.add.roundRectangle(0, 0, 100, 50, 0, 0x5f5fc4),
                    this.rexUI.add.roundRectangle(0, 0, 100, 50, 0, 0x5f5fc4)
                ],

                bottomButtons: [
                    this.rexUI.add.roundRectangle(0, 0, 100, 50, 0, 0x5f5fc4),
                    this.rexUI.add.roundRectangle(0, 0, 100, 50, 0, 0x5f5fc4),
                    this.rexUI.add.roundRectangle(0, 0, 100, 50, 0, 0x5f5fc4)
                ],

                space: {
                    left: 20,
                    right: 20,
                    top: 20,
                    bottom: 20,

                    leftButtonsOffset: 20,
                    rightButtonsOffset: 20,
                    topButtonsOffset: 20,
                    bottomButtonsOffset: 20,

                    leftButton: 10,
                    rightButton: 10,
                    topButton: 10,
                    bottomButton: 10
                }
            })
            .layout()
            .drawBounds(this.add.graphics(), 0xff0000);
    }

    update() {}
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
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