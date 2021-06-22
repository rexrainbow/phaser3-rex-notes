import 'phaser';
import TextPlayerPlugin from '../../plugins/textplayer-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('dude', 'assets/images/phaser-dude.png');
        this.load.audio('theme1', [
            'assets/audio/jungle.ogg',
            'assets/audio/jungle.mp3'
        ]);
    }

    create() {
        var content = `\
[se=theme1][color=#FFF8DC][b]Pha[shadow]ser[/b][/shadow] [img=dude] is a [i][stroke]fa[stroke=red]st[/stroke][/i], 
[size=24][shadow=yellow]free[/shadow][/size], a[y=-8]n[y=-16]d[/y] f[wait=1000]un 
[click][color=green]open[/color] source HTML5 game framework[r]

[color=#008B8B][wait=enter|click]that offers WebGL and Canvas rendering across desktop and mobile web browsers[r]
[color=#FF7F50]Games can be compiled to iOS, Android and native apps by using 3rd party tools[r]
[color=#F8F8FF]You can use JavaScript or TypeScript for development.`

        var Cubic = Phaser.Math.Easing.Cubic.Out;
        var Linear = Phaser.Math.Linear;
        var text = this.add.rexTextPlayer(
            {
                x: 400, y: 300,
                width: 400, height: 200,  // Fixed width and height

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
                },

                typing: {
                    speed: 200,  // 0: no-typing
                    animation: {
                        duration: 1000,
                        yoyo: true,
                        onStart: function (char) {
                            char
                                .setVisible()
                                .setData('y', char.y);
                        },
                        onProgress: function (char, t) {
                            var p0 = char.getData('y');
                            var p1 = p0 - 20;
                            var value = Linear(p0, p1, Cubic(t));
                            char.setY(value);
                        }
                    }
                },

                images: {
                    'dude': {
                        height: 24
                    }
                },

                sounds: {
                    bgm: {
                        loop: true,
                        fade: 1000
                    }
                },

                clickTarget: this
            }
        )

        var print = this.add.text(0, 580, 'Click to start');
        this.input.once('pointerdown', function () {
            text.playPromise(content)
                .then(function () {
                    print.setText('Play complete');
                    console.log('Play complete');
                })

        })

        this.input.keyboard.on('keydown-ENTER', function () {
            if (!text.isPlaying) {
                return;
            }

            if (text.isPageTyping) {
                text.showPage();  // Show all characters in this page
            } else {
                text.typingNextPage();
            }
        })

        // Events
        text
            .on('typing', function (child) {
                if (child.type === 'text') {
                    print.setText(`Typing ${child.text}`);
                } else {
                    print.setText(`Typing image ${child.key}`);
                }
            })
            .on('wait.click', function () {
                print.setText('Wait click');
            })
            .on('wait.keydown', function (keyName) {
                print.setText(`Wait ${keyName} keydown`);
            })
            .on('wait.time', function (time) {
                print.setText(`Wait time ${time}`);
            })
            .on('wait.music', function (music) {
                print.setText(`Wait music ${music.key}`);
            })
            .on('page.start', function () {
                console.log('page.start')
            })
            .on('page.complete', function () {
                console.log('page.complete')
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