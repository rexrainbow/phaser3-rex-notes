import 'phaser';
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
        var sizer = this.rexUI.add.sizer({
            x: 400, y: 300,
            orientation: 'x',
            space: { item: 5 }
        })
        for (var i = 0; i < 8; i++) {
            sizer.add(this.rexUI.add.label({
                width: 40, height: 40,
                background: this.rexUI.add.roundRectangle(0, 0, 0, 0, 14, COLOR_PRIMARY),
                text: this.add.text(0, 0, `${i}`),
                space: {
                    left: 10,
                    right: 10,
                    top: 10,
                    bottom: 10,
                },
                align: 'center'
            }));
        }
        sizer.layout();

        var print = this.add.text(0, 0, '');
        this.rexUI.setChildrenInteractive(sizer)
            .on('child.click', function (child) {
                var index = sizer.getElement('items').indexOf(child);
                print.text += `click ${index}\n`;
            })
            .on('child.over', function (child) {
                child.getElement('background').setStrokeStyle(4, 0xff0000);
            })
            .on('child.out', function (child) {
                child.getElement('background').setStrokeStyle();
            })
            .on('child.pressstart', function (child) {
                child.setScale(0.8);
            })
            .on('child.pressend', function (child) {
                child.setScale(1);
            })
            .on('child.1tap', function (child) {
                var index = sizer.getElement('items').indexOf(child);
                print.text += `1-tap ${index}\n`;
            })
            .on('child.2tap', function (child) {
                var index = sizer.getElement('items').indexOf(child);
                print.text += `2-tap ${index}\n`;
            })
            .on('child.swipeleft', function (child) {
                var index = sizer.getElement('items').indexOf(child);
                print.text += `swipe-left ${index}\n`;
            })
            .on('child.swiperight', function (child) {
                var index = sizer.getElement('items').indexOf(child);
                print.text += `swipe-right ${index}\n`;
            })
            .on('child.swipeup', function (child) {
                var index = sizer.getElement('items').indexOf(child);
                print.text += `swipe-up ${index}\n`;
            })
            .on('child.swipedown', function (child) {
                var index = sizer.getElement('items').indexOf(child);
                print.text += `swipe-down ${index}\n`;
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