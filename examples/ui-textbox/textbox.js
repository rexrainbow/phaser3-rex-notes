import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_MAIN = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

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
        // Size of text game object is changing when typing
        createTextBox(this, 100, 50, {
            wrapWidth: 500,
        })
            .start(content, 50);

        // Fixed size of textbox, and text game object
        createTextBox(this, 100, 200, {
            width: 600,
            height: 150,
            title: 'Title'
        })
            .start(content, 50);

        // Fixed size of text game object
        createTextBox(this, 100, 450, {
            wrapWidth: 500,
            fixedWidth: 500,
            fixedHeight: 65,
            typingMode: 'line'
        })
            .start(content, 50);
    }

    update() { }
}


const GetValue = Phaser.Utils.Objects.GetValue;
var createTextBox = function (scene, x, y, config) {
    var width = GetValue(config, 'width', 0);
    var height = GetValue(config, 'height', 0);
    var wrapWidth = GetValue(config, 'wrapWidth', 0);
    var fixedWidth = GetValue(config, 'fixedWidth', 0);
    var fixedHeight = GetValue(config, 'fixedHeight', 0);
    var titleText = GetValue(config, 'title', undefined);
    var typingMode = GetValue(config, 'typingMode', 'page');
    var maxLines = (width > 0) ? 0 : 3;

    var textBox = scene.rexUI.add.textBox({
        x: x, y: y,
        width: width, height: height,

        typingMode: typingMode,

        background: scene.rexUI.add.roundRectangle({ radius: 20, color: COLOR_MAIN, strokeColor: COLOR_LIGHT, strokeWidth: 2 }),

        icon: scene.rexUI.add.roundRectangle({ radius: 20, color: COLOR_DARK }),

        // text: getBuiltInText(scene, wrapWidth, fixedWidth, fixedHeight),
        text: getBBcodeText(scene, wrapWidth, fixedWidth, fixedHeight, maxLines),
        expandTextWidth: (width > 0),
        expandTextHeight: (height > 0),

        action: scene.add.image(0, 0, 'nextPage').setTint(COLOR_LIGHT).setVisible(false),

        title: (titleText) ? scene.add.text(0, 0, titleText, { fontSize: '24px', }) : undefined,

        separator: (titleText) ? scene.rexUI.add.roundRectangle({ height: 3, color: COLOR_DARK }) : undefined,

        space: {
            left: 20, right: 20, top: 20, bottom: 20,

            icon: 10, text: 10,

            separator: 6,
        },

        align: {
            title: 'center'
        }
    })
        .setOrigin(0)
        .layout();

    textBox
        .setInteractive()
        .on('pointerdown', function () {
            if (typingMode === 'page') {
                var icon = this.getElement('action').setVisible(false);
                this.resetChildVisibleState(icon);
                if (this.isTyping) {
                    this.stop(true);
                } else {
                    this.typeNextPage();
                }
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
    //.on('type', function () {
    //})

    return textBox;
}

var getBuiltInText = function (scene, wrapWidth, fixedWidth, fixedHeight, maxLines) {
    return scene.add.text(0, 0, '', {
        fontSize: '20px',
        fixedWidth: fixedWidth,
        fixedHeight: fixedHeight,
        wordWrap: {
            width: wrapWidth
        },
        maxLines: maxLines
    })
}

var getBBcodeText = function (scene, wrapWidth, fixedWidth, fixedHeight, maxLines) {
    return scene.rexUI.add.BBCodeText(0, 0, '', {
        fixedWidth: fixedWidth,
        fixedHeight: fixedHeight,

        fontSize: '20px',
        wrap: {
            mode: 'word',
            width: wrapWidth
        },
        maxLines: maxLines
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