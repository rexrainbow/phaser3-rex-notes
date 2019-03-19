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

    preload() {}

    create() {
        var textBlock = this.rexUI.add.textBlock({
                x: 400,
                y: 300,
                width: 220,
                height: 220,

                background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 0, COLOR_PRIMARY),
                // text: this.add.text(),
                text: this.rexUI.add.BBCodeText(),

                // clamplTextOY: false,

                space: {
                    left: 10,
                    right: 10,
                    top: 10,
                    bottom: 10,
                }
            })
            .layout()
            .drawBounds(this.add.graphics(), 0xff0000);

        textBlock
            .setText(CreateContent(20))
            .setTextOY(-150);
    }

    update() {}
}

var content = `Phaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. You can use JavaScript or TypeScript for development.`;
var CreateContent = function (linesCount) {
    var numbers = [];
    for (var i = 0; i < linesCount; i++) {        
        numbers.push('[color=' + ((i % 2) ? 'green' : 'yellow') + ']' + i.toString() + '[/color]');
    }
    return content + '\n' + numbers.join('\n');
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