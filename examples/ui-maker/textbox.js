import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';
import Handlebars from 'handlebars';

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

const UIContent = `
$type: TextBox

background:
    $type: RoundRectangle
    color: {{COLOR_PRIMARY}}
    radius: 20
    strokeColor: {{COLOR_LIGHT}}
    strokeWidth: 2

icon:
    $type: RoundRectangle
    color: {{COLOR_DARK}}
    radius: 20

text:
    $type: Text    
    fontSize: 20
    fixedWidth: {{fixedWidth}}
    fixedHeight: {{fixedHeight}}
    wordWrap:
        width: {{wrapWidth}}
    maxLines: 3

action:
    $type: Image
    key: nextPage
    tint: {{COLOR_LIGHT}}
    visible: false

space: {
    left: 20, right: 20, top: 20, bottom: 20,
    icon: 10,
    text: 10,
    }
`

var content = `Phaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. You can use JavaScript or TypeScript for development.`;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('nextPage', 'assets/images/arrow-down-left.png');
    }

    create() {
        var textBox = CreateTextBox(this, 100, 400, {
            wrapWidth: 500,
            fixedWidth: 500,
            fixedHeight: 65,
        })
            .start(content, 50);

    }

    update() { }
}

const GetValue = Phaser.Utils.Objects.GetValue;
var CreateTextBox = function (scene, x, y, config) {
    var fixedWidth = GetValue(config, 'fixedWidth', 0);
    var fixedHeight = GetValue(config, 'fixedHeight', 0);
    var wrapWidth = GetValue(config, 'wrapWidth', fixedWidth);

    var maker = scene.rexUI.add.maker();
    var data = Handlebars.compile(UIContent)({
        COLOR_PRIMARY: COLOR_PRIMARY,
        COLOR_LIGHT: COLOR_LIGHT,
        COLOR_DARK: COLOR_DARK,

        fixedWidth: fixedWidth,
        fixedHeight: fixedHeight,
        wrapWidth: wrapWidth
    });
    var textBox = maker.make(data)
        .setPosition(x, y)
        .setOrigin(0)
        .layout()

    textBox
        .setInteractive()
        .on('pointerdown', function () {
            var icon = this.getElement('action').setVisible(false);
            this.resetChildVisibleState(icon);
            if (this.isTyping) {
                this.stop(true);
            } else if (!this.isLastPage) {
                this.typeNextPage();
            } else {
                // Next actions
            }
        }, textBox)
        .on('pageend', function () {
            if (this.isLastPage) {
                return;
            }

            var icon = this.getElement('action').setVisible(true);
            this.resetChildVisibleState(icon);
            icon.y -= 30;
            var tween = scene.tweens.add({
                targets: icon,
                y: '+=30', // '+=100'
                ease: 'Bounce', // 'Cubic', 'Elastic', 'Bounce', 'Back'
                duration: 500,
                repeat: 0, // -1: infinity
                yoyo: false
            });
        }, textBox)
        .on('complete', function () {
            console.log('all pages typing complete')
        })

    return textBox;
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