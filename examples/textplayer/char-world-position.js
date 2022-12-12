import phaser from 'phaser/src/phaser.js';
import TextPlayerPlugin from '../../plugins/textplayer-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var content = `\
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA[pb]
BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB[pb]
CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC[pb]`

        var Ease = Phaser.Math.Easing.Back.Out
        var scene = this;
        var text = this.add.rexTextPlayer(
            {
                x: 400, y: 300,
                width: 300, height: 150,  // Fixed width and height

                background: {
                    stroke: 'white',
                    cornerRadius: 20
                },

                innerBounds: {
                    stroke: '#A52A2A'
                },

                padding: 20,

                style: {
                    fontSize: '16px',
                    stroke: 'green',
                    strokeThickness: 3,

                    shadowColor: 'red',
                    shadowOffsetX: 5,
                    shadowOffsetY: 5,
                    shadowBlur: 3
                },

                wrap: {
                    maxLines: 5,
                    padding: { bottom: 10 },
                    charWrap: true
                },

                typing: {
                    speed: 150,  // 0: no-typing
                    animation: {
                        duration: 300,
                        onStart: function (char, t) {
                            char.setVisible().setScale(t, t);
                        },
                        onProgress: function (char, t) {
                            t = Ease(t)
                            char.setScale(t, t);
                        }
                    },
                },

                clickTarget: this,
                nextPageInput: 'click'
            }
        )
            .setAngle(-45)

        var charDots = [];
        text
            .on('page.start', function () {
                for (var i = 0, cnt = charDots.length; i < cnt; i++) {
                    charDots[i].destroy();
                }
                charDots.length = 0;
            })
            .on('typing', function (child) {
                var worldXY = child.getWorldPosition();
                var dot = this.add.circle(0, 0, 20, 0x00ff00).setRandomPosition()
                this.tweens.add({
                    targets: dot,
                    x: worldXY.x,
                    y: worldXY.y,
                    radius: 2,
                    duration: 200
                })
                charDots.push(dot);
            }, this)


        var print = this.add.text(0, 580, 'Click to start');
        this.input.once('pointerdown', function () {
            text.playPromise(content)
                .then(function () {
                    print.setText('Play complete');
                    console.log('Play complete');
                })
        })


    }

    update() { }
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
            key: 'rexTextPlayer',
            plugin: TextPlayerPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);