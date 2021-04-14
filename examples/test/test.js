import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

class DecisionPanel {
    constructor(scene, x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.scene = scene;

        var data = [];
        data.push("test 1");
        data.push("test 2");
        data.push("test 3");

        this.panel = this.createDecisionPanel(data, this.x, this.y, this.width, this.height);
        this.panel.popUp(300);
        //this.scene.plugins.get('rexscaleplugin').popup(this.panel, 300);
    }

    createDecisionPanel(data, x, y, width, height) {
        var sizer = this.scene.rexUI.add.sizer({
            x: x,
            y: y,
            width: width,
            height: height,
            orientation: 'y',
            space: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,

                item: 10,
            }
        })
            .add(this.createScrollPanel(data, x, y, width, height))
            .layout();

        sizer.setDepth(2)
        return sizer;
    }

    createScrollPanel(data, x, y, width, height) {
        this.scrollPanel = this.scene.rexUI.add.scrollablePanel({
            x: x,
            y: y,
            height: height,
            width: width,
            scrollMode: 0,

            background: this.scene.rexUI.add.roundRectangle(0, 0, 2, 2, 10, COLOR_DARK),

            panel: {
                child: this.createButtonsTable(data),

                mask: {
                    padding: 1
                },
            },

            slider: {
                track: this.scene.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
                thumb: this.scene.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
            },

            // scroller: true,

            space: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,

                panel: 10,
            }
        }).layout();

        return this.scrollPanel;
    }

    createButtonsTable(data) {
        var self = this;
        var buttons = this.scene.rexUI.add.buttons({
            width: this.scene.game.config.width / 3,
            orientation: 'y',

            buttons: this.createButtons(data),

            space: {
                left: 10, right: 10, top: 10, bottom: 10,
                item: 3
            },
            expand: true,
            key: "decision"
        });

        return buttons;
    }

    createButtons(data) {
        var buttons = [];
        data.forEach(element => {
            var button = this.scene.rexUI.add.label({
                width: 40,
                height: 40,
                background: this.scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, COLOR_LIGHT),
                text: this.scene.add.text(0, 0, element, {
                    fontSize: 18
                }),
                space: {
                    left: 10,
                    right: 10,
                },
                align: 'center'
            });

            buttons.push(button);
        });

        return buttons
    }
}

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var panel = new DecisionPanel(this, 400, 300, 200, 200);
    }

    update() { }
}

var config = {
    type: Phaser.CANVAS,
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