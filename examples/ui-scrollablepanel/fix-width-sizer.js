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
        this.print = this.add.text(0, 0, '');

        var scrollablePanel = this.rexUI.add.scrollablePanel({
            x: 400,
            y: 300,
            width: 250,
            height: 220,

            scrollMode: 0,

            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 10, COLOR_PRIMARY),

            panel: {
                child: this.rexUI.add.fixWidthSizer({
                    space: {
                        left: 3,
                        right: 3,
                        top: 3,
                        bottom: 3,
                        item: 8,
                        line: 8,
                    }
                }),

                mask: {
                    padding: 1
                },
            },

            slider: {
                track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
                thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
            },

            space: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,

                panel: 10,
            }
        })
            .layout()
        //.drawBounds(this.add.graphics(), 0xff0000);

        updatePanel(scrollablePanel, content);
    }

    update() { }
}

var updatePanel = function (panel, content) {
    var sizer = panel.getElement('panel');
    var scene = panel.scene;

    sizer.clear(true);
    var words = content.split(' ');
    for (var i = 0, cnt = words.length; i < cnt; i++) {
        let word = words[i];
        sizer.add(
            scene.add.text(0, 0, word, {
                fontSize: 18
            })
                .setInteractive()
                .on('pointerdown', function () {
                    scene.print.text = word;
                }, scene)
        );
    }

    panel.layout();
    return panel;
}

var content = `Phaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. You can use JavaScript or TypeScript for development.`;

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