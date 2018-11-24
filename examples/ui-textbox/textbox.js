import UIPlugin from 'rexTemplates/ui/ui-plugin.js';
import BBCodeTextPlugin from 'rexPlugins/bbcodetext-plugin.js';

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

var content = `Phaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. You can use JavaScript or TypeScript for development.`;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var textBox = this.rexUI.add.textBox({
                x: 100,
                y: 100,

                background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY)
                    .setStrokeStyle(2, COLOR_LIGHT),
                // text: getBuiltInText(this),
                text: getBBcodeText(this),

                space: {
                    left: 20,
                    right: 20,
                    top: 20,
                    bottom: 20,
                    icon: 10
                }
            })
            .setOrigin(0)
            .layout();

        textBox
            .setInteractive()
            .on('pointerdown', function () {
                if (this.isTyping) {
                    this.stop(true);
                } else {
                    this.typeNextPage();
                }
            }, textBox)
            //.on('pageend', function () {
            //}, textBox)
            //.on('type', function () {
            //})

        textBox
            .start(content, 50);
    }

    update() {}
}

var getBuiltInText = function (scene) {
    return scene.add.text(0, 0, '', {
        fontSize: '20px',
        wordWrap: {
            width: 500
        },
        maxLines: 3
    })
}

var getBBcodeText = function (scene) {
    return scene.add.rexBBCodeText(0, 0, '', {
        fontSize: '20px',
        wrap: {
            mode: 'word',
            width: 500
        },
        maxLines: 3
    })
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Demo,
    plugins: {
        global: [{
            key: 'BBCodeTextPlugin',
            plugin: BBCodeTextPlugin,
            start: true
        }],
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }
};

var game = new Phaser.Game(config);