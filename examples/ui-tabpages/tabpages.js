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

    preload() { }

    create() {
        var tabPages = this.rexUI.add.tabPages({
            x: 400, y: 300,
            width: 500, height: 400,
            background: this.rexUI.add.roundRectangle(0, 0, 0, 0, 0, COLOR_DARK),

            tabs: {
                space: { item: 3 }
            },
            pages: {
                fadeIn: 300
            },

            align: {
                tabs: 'left'
            },

            space: { left: 5, right: 5, top: 5, bottom: 5, item: 10 }

        })
            .on('tab.focus', function (tab, index) {
                tab.getElement('background').setStrokeStyle(2, COLOR_LIGHT);
            })
            .on('tab.blur', function (tab, index) {
                tab.getElement('background').setStrokeStyle();
            })

        tabPages
            .addPage({
                key: 'page0',
                tab: CreateLabel(this, 'Page0'),
                page: CreatePage(this)
            })
            .addPage({
                key: 'page1',
                tab: CreateLabel(this, 'Page1'),
                page: CreatePage(this)
            })
            .addPage({
                key: 'page2',
                tab: CreateLabel(this, 'Page2'),
                page: CreatePage(this)
            })
            .layout()
            .swapFirstPage()

        // Remove page testing
        // tabPages.removePage('page2', true).layout();
    }

    update() { }
}

var CreateLabel = function (scene, text) {
    return scene.rexUI.add.label({
        width: 40, height: 40,

        background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 0, COLOR_PRIMARY),
        text: scene.add.text(0, 0, text, { fontSize: 24 }),

        space: { left: 10, right: 10, top: 10, bottom: 10 }
    })
}

const content = `Phaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. You can use JavaScript or TypeScript for development.`;
var CreatePage = function (scene) {
    return scene.rexUI.add.textArea({
        text: scene.rexUI.add.BBCodeText(0, 0, '', { fontSize: 24 }),
        slider: {
            track: scene.rexUI.add.roundRectangle(0, 0, 20, 0, 10, COLOR_PRIMARY),
            thumb: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT)
        },

        content: `\
${content}
....
[color=green]${content}[/color]
....
[color=cadetblue]${content}[/color]
....
[color=yellow]${content}[/color]\
`
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