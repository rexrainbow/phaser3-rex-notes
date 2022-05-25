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
        var ui = CreateTabPage(this)
            .setPosition(400, 300)
            .layout()

        ui.getElement('tabs').on('button.statechange', function (button, index, value, previousValue) {
            // Style of button
            var background = button.getElement('background');
            if (value) {
                background.setStrokeStyle(2, COLOR_LIGHT);
            } else {
                background.setStrokeStyle();
            }

            // Swap page
            if (value) {
                ui.getElement('pages').swapPage(button.name);
            }
        })
            .emitButtonClick(0);
    }

    update() { }
}

var CreateTabPage = function (scene) {
    return scene.rexUI.add.sizer({
        width: 500, height: 400,
        orientation: 'y',
        space: { left: 5, right: 5, top: 5, bottom: 5, item: 10 }
    })
        .addBackground(scene.rexUI.add.roundRectangle(0, 0, 0, 0, 0, COLOR_DARK))
        .add(
            CreateButtons(scene),
            {
                key: 'tabs', align: 'left'
            }
        )
        .add(
            CreatePages(scene),
            {
                key: 'pages', proportion: 1, expand: true
            }
        )
}

var CreateLabel = function (scene, text) {
    return scene.rexUI.add.label({
        width: 40, height: 40,

        background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 0, COLOR_PRIMARY),
        text: scene.add.text(0, 0, text, { fontSize: 24 }),

        space: { left: 10, right: 10, top: 10, bottom: 10 }
    })
}

var CreateButtons = function (scene) {
    return scene.rexUI.add.buttons({
        orientation: 'x',
        space: { item: 3 },

        buttons: [
            CreateLabel(scene, 'Page0').setName('page0'),
            CreateLabel(scene, 'Page1').setName('page1'),
            CreateLabel(scene, 'Page2').setName('page2'),
        ],

        buttonsType: 'radio'
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

var CreatePages = function (scene) {
    return scene.rexUI.add.pages()
        .add(
            CreatePage(scene),
            { key: 'page0', expand: true }
        )
        .add(
            CreatePage(scene),
            { key: 'page1', expand: true }
        )
        .add(
            CreatePage(scene),
            { key: 'page2', expand: true }
        )
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