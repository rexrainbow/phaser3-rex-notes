import Phaser from 'phaser/src/phaser.js';
import TagPlayerPlugin from '../../plugins/tagplayer-plugin.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.atlas('knight', 'assets/animations/knight.png', 'assets/animations/knight.json');
        this.load.image('nextPage', 'assets/images/arrow-down-left.png');
    }

    create() {
        this.anims.create({
            key: 'guardStart',
            frames: this.anims.generateFrameNames('knight', { prefix: 'guard_start/frame', start: 0, end: 3, zeroPad: 4 }),
            frameRate: 8
        });

        this.anims.create({
            key: 'guard',
            frames: this.anims.generateFrameNames('knight', { prefix: 'guard/frame', start: 0, end: 5, zeroPad: 4 }),
            frameRate: 8,
            repeat: 2
        });

        this.anims.create({
            key: 'guardEnd',
            frames: this.anims.generateFrameNames('knight', { prefix: 'guard_end/frame', start: 0, end: 3, zeroPad: 4 }),
            frameRate: 8
        });

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNames('knight', { prefix: 'idle/frame', start: 0, end: 5, zeroPad: 4 }),
            frameRate: 8,
            repeat: -1
        });

        var content = `
// Prelude
[char.A][char.A.play=idle]
[char.A.x=300][char.A.x.fromLeft=300,1000]
[char.A.y=300][char.A.y.fromUp=300,1000]

[char.B][char.B.toggleFlipX][char.B.play=idle]
[char.B.x=800][char.B.x.to=500,1000]
[char.B.y=600][char.B.y.to=300,1000]

[wait=1200]

// Main
[char.A.talk=false]
Hello\\n
Hello\\n
Hello

[char.B.talk]
World

[wait=char.A.typing]
[wait=char.B.typing]
[wait=200]

[char.A.x.toLeft=100,1000]
[char.B.x.toRight=100,1000]
[wait=1000]

[char.A.talk=false]Good
[char.B.talk]Bye

[wait=500]

// Postlude
[/char][wait=char]

`

        var tagPlayer = this.plugins.get('rexTagPlayerPlugin').add(this, {
            sprites: false,
            texts: false,
        })
            .addGameObjectManager({
                name: 'char',
                createGameObject: CreateGameObject
            })

        tagPlayer
            .playPromise(content)
            .then(function () {
                console.log('TagPlayer: Complete')
            })

        // Draw bounds of all game objects
        var debuggerGraphics = this.add.graphics();
        this.events.on('postupdate', function () {
            debuggerGraphics.clear();
            tagPlayer.drawGameObjectsBounds(debuggerGraphics, 0xff0000);
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
        .setOrigin(0.5, 1)
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

const IsTyping = false;
class MySpriteBase extends RexPlugins.UI.Container {
    constructor(scene, key, frame) {
        var sprite = scene.add.sprite(0, 0, key, frame);
        var text = CreateTextBox(scene, 100).setPosition(0, -(sprite.height / 2)).setVisible(false);
        super(scene, 0, 0, [sprite, text]);
        this.sprite = sprite;
        this.text = text;
        this.setData('typing', !IsTyping);
    }

    get flipX() {
        return this.sprite.flipX;
    }
    set flipX(value) {
        this.sprite.flipX = value;
    }
    get flipY() {
        return this.sprite.flipY;
    }
    set flipY(value) {
        this.sprite.flipY = value;
    }

    setflip(x, y) {
        this.flipX = x;
        this.flipY = y;
        return this;
    }

    toggleFlipX() {
        this.flipX = !this.flipX;
        return this;
    }

    toggleFlipY() {
        this.flipY = !this.flipY;
        return this;
    }

    play(key, ignoreIfPlaying) {
        this.sprite.play(key, ignoreIfPlaying);
        return this;
    }

    talk(speed) {
        var textBox = this.text;
        textBox.setVisible(true);
        if (speed !== undefined) {
            textBox.setTypeSpeed(speed);
        }
        return this;
    }

    typing(content) {
        this.setData('typing', IsTyping);
        this.text
            .once('complete', function () {
                this.setData('typing', !IsTyping);
            }, this)
            .start(content);
        return this;
    }
}

class MySprite extends MySpriteBase {
    talk(speed, waitTyping) {
        if (typeof (speed) === 'boolean') {
            waitTyping = speed;
            speed = undefined;
        }
        if (waitTyping === undefined) {
            waitTyping = true;
        }

        super.talk(speed);

        this.waitTyping = waitTyping;
        this.tagPlayer.setContentCallback(this.typing, this);
        return this;
    }

    typing(content) {
        if (this.waitTyping) {
            this.tagPlayer.pauseUntilEvent(this.text, 'complete');
        }
        super.typing(content);
        return this;
    }
}



var CreateGameObject = function (scene, key, frame) {
    var sprite = new MySprite(scene, key, frame);
    sprite.tagPlayer = this;
    scene.add.existing(sprite);
    return sprite;
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