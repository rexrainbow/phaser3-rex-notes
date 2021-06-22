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
        var sizer = this.rexUI.add.gridSizer({
            x: 400, y: 300,
            width: 400, height: 400,
            column: 6, row: 6,
            columnProportions: 1, rowProportions: 1,
            space: {
                column: 5, row: 5
            },
        })
        for (var i = 0; i < sizer.rowCount; i++) {
            for (var j = 0; j < sizer.columnCount; j++) {
                sizer.add(
                    this.rexUI.add.label({
                        background: this.rexUI.add.roundRectangle(0, 0, 0, 0, 14, COLOR_PRIMARY),
                        text: this.add.text(0, 0, `${i},${j}`),
                        space: {
                            left: 10,
                            right: 10,
                            top: 10,
                            bottom: 10,
                        },
                        align: 'center'
                    }), // child
                    i, // columnIndex
                    j, // rowIndex
                    'center', // align
                    0, // paddingConfig
                    true, // expand
                )
            }
        }
        sizer.layout();

        var print = this.add.text(0, 0, '');
        this.rexUI.setChildrenInteractive(sizer)
            .on('child.click', function (child) {
                var gridIndex = sizer.childToGridIndex(child);
                print.text += `click ${gridIndex.x},${gridIndex.y}\n`;
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
                var gridIndex = sizer.childToGridIndex(child);
                print.text += `1-tap ${gridIndex.x},${gridIndex.y}\n`;
            })
            .on('child.2tap', function (child) {
                var gridIndex = sizer.childToGridIndex(child);
                print.text += `2-tap ${gridIndex.x},${gridIndex.y}\n`;
            })
            .on('child.swipeleft', function (child) {
                var gridIndex = sizer.childToGridIndex(child);
                print.text += `swipe-left ${gridIndex.x},${gridIndex.y}\n`;
            })
            .on('child.swiperight', function (child) {
                var gridIndex = sizer.childToGridIndex(child);
                print.text += `swipe-right ${gridIndex.x},${gridIndex.y}\n`;
            })
            .on('child.swipeup', function (child) {
                var gridIndex = sizer.childToGridIndex(child);
                print.text += `swipe-up ${gridIndex.x},${gridIndex.y}\n`;
            })
            .on('child.swipedown', function (child) {
                var gridIndex = sizer.childToGridIndex(child);
                print.text += `swipe-down ${gridIndex.x},${gridIndex.y}\n`;
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