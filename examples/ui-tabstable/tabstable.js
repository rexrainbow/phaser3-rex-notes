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
        var tabs = this.rexUI.add.tabsTable({
                x: 400,
                y: 300,

                background: this.rexUI.add.roundRectangle(0, 0, 10, 10, 0, 0x333333),

                table: {
                    width: 250,
                    height: 400,

                    cellWidth: 120,
                    cellHeight: 60,
                    columns: 2,
                },

                slider: {
                    track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, 0x260e04),
                    thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, 0x7b5e57),
                },

                createCellContainerCallback: function (cell) {
                    var scene = cell.scene,
                        width = cell.width,
                        height = cell.height,
                        item = cell.item,
                        index = cell.index;
                    return scene.rexUI.add.label({
                            width: width,
                            height: height,

                            background: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 0).setStrokeStyle(2, 0x260e04),
                            icon: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 10, item.color),
                            text: scene.add.text(0, 0, item.id),

                            space: {
                                icon: 10,
                                left: 15
                            }
                        })
                        .setOrigin(0)
                        .layout();
                },

                leftButtons: [
                    this.rexUI.add.roundRectangle(0, 0, 50, 50, {
                        tl: 20,
                        bl: 20
                    }, Random(0, 0xffffff)),
                    this.rexUI.add.roundRectangle(0, 0, 50, 50, {
                        tl: 20,
                        bl: 20
                    }, Random(0, 0xffffff)),
                    this.rexUI.add.roundRectangle(0, 0, 50, 50, {
                        tl: 20,
                        bl: 20
                    }, Random(0, 0xffffff)),
                ],

                space: {
                    left: 20,
                    right: 20,
                    top: 20,
                    bottom: 20,

                    leftButtonsOffset: 20,

                    leftButton: 1,
                }
            })
            .layout()
        // .drawBounds(this.add.graphics(), 0xff0000);

        this.print = this.add.text(0, 0, '');
        tabs
            .on('button.click', function (button, groupName, index) {
                this.print.text += groupName + '-' + index + '\n';
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