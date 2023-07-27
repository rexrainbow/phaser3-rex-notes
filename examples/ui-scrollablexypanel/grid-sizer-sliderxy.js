import phaser from 'phaser/src/phaser.js';
import ScrollableXYPanel from '../../templates/ui/scrollablexypanel/ScrollableXYPanel.js';
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
        var panel = new ScrollableXYPanel(this, {
            x: 400, y: 300,
            width: 400, height: 400,

            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 10, COLOR_PRIMARY),

            panel: {
                child: CreatePanel(this),
                mask: {
                    mask: true,
                    padding: 1,
                }
            },

            header: this.rexUI.add.label({
                height: 30,

                orientation: 0,
                background: this.rexUI.add.roundRectangle(0, 0, 20, 20, 0, COLOR_DARK),
                text: this.add.text(0, 0, 'Header'),
            }),

            footer: this.rexUI.add.label({
                height: 30,

                orientation: 0,
                background: this.rexUI.add.roundRectangle(0, 0, 20, 20, 0, COLOR_DARK),
                text: this.add.text(0, 0, 'Footer'),
            }),


            sliderX: {
                track: { width: 20, radius: 10, color: COLOR_DARK },
                thumb: { radius: 13, color: COLOR_LIGHT }
            },

            sliderY: {
                track: { width: 20, radius: 10, color: COLOR_DARK },
                thumb: { radius: 13, color: COLOR_LIGHT }
            },

            space: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,

                panel: 0,
                sliderX: 10,
                sliderY: 10,
                header: 10,
                footer: 10,
            }
        })

        this.add.existing(panel)

        panel
            .layout()
            .scrollToChild(panel.getElement('panel').getChildAt(5, 8), {x:'left', y:'top'})

    }

    update() { }
}

var CreatePanel = function (scene) {
    return scene.rexUI.add.gridSizer({
        column: 10, row: 10,
        columnProportions: 0, rowProportions: 0,
        createCellContainerCallback: function (scene, x, y, config) {
            config.expand = true;
            var cellContainer = scene.rexUI.add.label({
                width: 80, height: 60,
                space: { left: 10, right: 10, top: 10, bottom: 10 },
                background: scene.rexUI.add.roundRectangle({ strokeColor: COLOR_LIGHT }),
                text: scene.add.text(0, 0, `[${x},${y}]`),
                align: 'center',
            })
            return cellContainer;
        }
    })
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