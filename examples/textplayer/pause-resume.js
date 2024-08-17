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
        var content = `AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA`

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
                nextPageInput: 'click|2000'
            }
        )

        var print = this.add.text(0, 580, 'Click to start');
        this.input.once('pointerdown', function () {
            text.playPromise(content)
                .then(function () {
                    print.setText('Play complete');
                    console.log('Play complete');
                })

            this.time.delayedCall(550, function () {
                text.pause()
            })
            this.time.delayedCall(1550, function () {
                text.resume()
            })
            this.time.delayedCall(2550, function () {
                text.pauseTyping()
            })
            this.time.delayedCall(3550, function () {
                text.resumeTyping()
            })
        }, this)


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