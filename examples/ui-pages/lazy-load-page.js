import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_MAIN = 0x4e342e;
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
        var ui = CreateTabPages(this)
            .setPosition(400, 300)
            .layout()

        ui.getElement('pages').swapPage('0')

        ui.getElement('tabs').on('button.click', function (button, index, pointer, event) {
            // Swap page
            var pages = ui.getElement('pages');
            var pageIndex = parseInt(pages.currentKey);
            pageIndex += (index === 0) ? -1 : 1;
            if (pageIndex < 0) {
                return;
            }
            pages.swapPage(pageIndex.toString());
        })
    }

    update() { }
}

var CreateTabPages = function (scene) {
    return scene.rexUI.add.sizer({
        width: 500, height: 400,
        orientation: 'y',
        space: { left: 5, right: 5, top: 5, bottom: 5, item: 10 },
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

        background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 0, COLOR_MAIN),
        text: scene.add.text(0, 0, text, { fontSize: 24 }),

        space: { left: 10, right: 10, top: 10, bottom: 10 }
    })
}

var CreateButtons = function (scene) {
    return scene.rexUI.add.buttons({
        orientation: 'x',
        space: { item: 3 },

        buttons: [
            CreateLabel(scene, 'Previous page'),
            CreateLabel(scene, 'Next page'),
        ],
    })
}

var CreatePage = function (scene, index) {
    return scene.rexUI.add.label({
        text: scene.rexUI.add.BBCodeText(0, 0, '', { fontSize: 24 }),
    }).setText(`This is page ${index}`)
}

var CreatePages = function (scene) {
    return scene.rexUI.add.pages({
        swapMode: 'destroy',
        fadeIn: 500
    })
        .on('createpage', function (key, pages) {
            pages
                .addPage(
                    CreatePage(scene, key),
                    { key: key, align: 'left-top', expand: false }
                )

            pages.getTopmostSizer()
                .layout()
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