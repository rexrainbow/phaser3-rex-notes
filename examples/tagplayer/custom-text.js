import phaser from 'phaser/src/phaser.js';
import TagPlayerPlugin from '../../plugins/tagplayer-plugin.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {

    }

    create() {
        var content = `
// [text.a=100,100,100]  // wrapWidth, width, height
[text.a]
[text.a.x=200]
[text.a.y=300]
[text.a.typing=50]
Hello\\n
Phaser\\n
World
`

        var tagPlayer = this.plugins.get('rexTagPlayerPlugin').add(this, {
            texts: {
                createGameObject: CreateTextBox
            }
        })
            .playPromise(content)
            .then(function () {
                console.log('Complete')
            })
    }

    update() { }
}

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;
var CreateTextBox = function (scene, wrapWidth, width, height) {
    if (width === undefined) {
        width = 0;
    }
    if (height === undefined) {
        height = 0;
    }
    var textBox = scene.rexUI.add.textBox({
        background: CreateSpeechBubbleShape(scene)
            .setFillStyle(COLOR_PRIMARY, 1)
            .setStrokeStyle(2, COLOR_LIGHT, 1),

        icon: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_DARK),

        text: CreateBuiltInText(scene, wrapWidth, width, height),

        action: scene.add.image(0, 0, 'nextPage').setTint(COLOR_LIGHT).setVisible(false),

        space: {
            left: 10, right: 10, top: 10, bottom: 25,
            icon: 10,
            text: 10,
        }
    })
        .setOrigin(0, 1)
        .layout();

    textBox
        .setInteractive()
        .on('pointerdown', function () {
            var icon = this.getElement('action').setVisible(false);
            this.resetChildVisibleState(icon);
            if (this.isTyping) {
                this.stop(true);
            } else {
                this.typeNextPage();
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
    //.on('type', function () {
    //})

    return textBox;
}

var CreateBuiltInText = function (scene, wrapWidth, width, height) {
    return scene.add.text(0, 0, '', {
        fontSize: '20px',
        wordWrap: {
            width: wrapWidth
        },
        maxLines: 3
    })
        .setFixedSize(width, height);
}

var CreateSpeechBubbleShape = function (scene) {
    return scene.rexUI.add.customShapes({
        create: { lines: 1 },
        update: function () {
            var radius = 20;
            var indent = 15;

            var left = 0, right = this.width,
                top = 0, bottom = this.height, boxBottom = bottom - indent;
            this.getShapes()[0]
                .lineStyle(this.lineWidth, this.strokeColor, this.strokeAlpha)
                .fillStyle(this.fillColor, this.fillAlpha)
                // top line, right arc
                .startAt(left + radius, top).lineTo(right - radius, top).arc(right - radius, top + radius, radius, 270, 360)
                // right line, bottom arc
                .lineTo(right, boxBottom - radius).arc(right - radius, boxBottom - radius, radius, 0, 90)
                // bottom indent                    
                .lineTo(left + 60, boxBottom).lineTo(left + 50, bottom).lineTo(left + 40, boxBottom)
                // bottom line, left arc
                .lineTo(left + radius, boxBottom).arc(left + radius, boxBottom - radius, radius, 90, 180)
                // left line, top arc
                .lineTo(left, top + radius).arc(left + radius, top + radius, radius, 180, 270)
                .close();

        }
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
        global: [{
            key: 'rexTagPlayerPlugin',
            plugin: TagPlayerPlugin,
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