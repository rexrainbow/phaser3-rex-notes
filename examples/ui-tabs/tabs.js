import UIPlugin from '../../templates/ui/ui-plugin.js';

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

                background: this.rexUI.add.roundRectangle(0, 0, 10, 10, 0, 0x333333),

                panel: this.rexUI.add.roundRectangle(0, 0, 400, 400, 20, 0x0),

                leftButtons: [
                    this.rexUI.add.roundRectangle(0, 0, 100, 50, {
                        tl: 25,
                        bl: 25
                    }, Random(0, 0xffffff)),
                    this.rexUI.add.roundRectangle(0, 0, 100, 50, {
                        tl: 25,
                        bl: 25
                    }, Random(0, 0xffffff)),
                    this.rexUI.add.roundRectangle(0, 0, 100, 50, {
                        tl: 25,
                        bl: 25
                    }, Random(0, 0xffffff)),
                ],

                rightButtons: [
                    this.rexUI.add.roundRectangle(0, 0, 100, 50, {
                        br: 25,
                        tr: 25
                    }, Random(0, 0xffffff)),
                    this.rexUI.add.roundRectangle(0, 0, 100, 50, {
                        br: 25,
                        tr: 25
                    }, Random(0, 0xffffff)),
                    this.rexUI.add.roundRectangle(0, 0, 100, 50, {
                        br: 25,
                        tr: 25
                    }, Random(0, 0xffffff)),
                ],

                topButtons: [
                    this.rexUI.add.roundRectangle(0, 0, 100, 50, {
                        tl: 50,
                        tr: 50
                    }, Random(0, 0xffffff)),
                    this.rexUI.add.roundRectangle(0, 0, 100, 50, {
                        tl: 50,
                        tr: 50
                    }, Random(0, 0xffffff)),
                    this.rexUI.add.roundRectangle(0, 0, 100, 50, {
                        tl: 50,
                        tr: 50
                    }, Random(0, 0xffffff)),
                ],

                bottomButtons: [
                    this.rexUI.add.roundRectangle(0, 0, 100, 50, {
                        bl: 50,
                        br: 50
                    }, Random(0, 0xffffff)),
                    this.rexUI.add.roundRectangle(0, 0, 100, 50, {
                        bl: 50,
                        br: 50
                    }, Random(0, 0xffffff)),
                    this.rexUI.add.roundRectangle(0, 0, 100, 50, {
                        bl: 50,
                        br: 50
                    }, Random(0, 0xffffff)),
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
        // .drawBounds(this.add.graphics(), 0xff0000);

        this.print = this.add.text(0, 0, '');
        tabs
            .on('button.click', function (button, groupName, index) {
                this.print.text += groupName + '-' + index + '\n';
                tabs.getElement('panel').setFillStyle(button.fillColor);
            }, this)

        tabs.emitButtonClick('left', 0);
    }

    update() {}
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