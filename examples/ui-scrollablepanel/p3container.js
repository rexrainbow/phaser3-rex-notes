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

    preload() {
        this.load.bitmapFont('gothic', 'assets/fonts/gothic.png', 'assets/fonts/gothic.xml');
    }

    create() {
        var scrollablePanel = this.rexUI.add.scrollablePanel({
            x: 400, y: 300,
            height: 320,

            scrollMode: 'y',

            background: this.rexUI.add.roundRectangle({
                strokeColor: COLOR_LIGHT,
                radius: 10
            }),

            panel: {
                child: createPanel(this),

                mask: { padding: 1, },
            },

            slider: {
                track: this.rexUI.add.roundRectangle({ width: 20, radius: 10, color: COLOR_DARK }),
                thumb: this.rexUI.add.roundRectangle({ radius: 13, color: COLOR_LIGHT })
            },

            header: this.rexUI.add.label({
                space: { left: 5, right: 5, top: 5, bottom: 5 },
                background: this.rexUI.add.roundRectangle({ color: COLOR_PRIMARY }),
                text: this.add.text(0, 0, 'Header', { fontSize: 20 })
            }),

            footer: this.rexUI.add.label({
                space: { left: 5, right: 5, top: 5, bottom: 5 },
                background: this.rexUI.add.roundRectangle({ color: COLOR_PRIMARY }),
                text: this.add.text(0, 0, 'Footer', { fontSize: 20 })
            }),

            space: { left: 20, right: 20, top: 20, bottom: 20, panel: 3, header: 5, footer: 5 }
        })
            .layout()

    }

    update() { }
}

var CreateContent = function (linesCount) {
    var numbers = [];
    for (var i = 0; i < linesCount; i++) {
        numbers.push(i.toString());
    }
    return numbers.join('\n');
}

var createPanel = function (scene) {
    var text = scene.add.bitmapText(0, 0, 'gothic').setText(CreateContent(30));
    var container = scene.add.container()
        .add(text)
        .setSize(200, text.height);

    return container;
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