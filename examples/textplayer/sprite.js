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
        this.load.atlas('knight', 'assets/animations/knight.png', 'assets/animations/knight.json');
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
[camera.scroll=0,200]
[camera.rotate=-90][camera.rotate.to=0,2000,Cubic]
[camera.zoom=2][camera.zoom.to=1,2000,Cubic][wait=camera.zoom][wait=300]
[camera.scroll.to=0,0,2000,Cubic][wait=camera.scroll]
[camera.shake=500][camera.flash]

// Content
[color=red][size=24]H[/color]ello 

// Comments : dude sprite
[sprite.dude=dude]
[sprite.dude.x=100][sprite.dude.x.to=700,5000,Cubic]
[sprite.dude.y=300][sprite.dude.y.yoyo=100,1000]

// knight sprite
[sprite.knight.play=idle,guard]
[sprite.knight.x=400][sprite.knight.y=300]
    
// Content
[color=yellow]phaser3[/color]

[wait=sprite.dude.x][/sprite.dude]
[sprite.knight.stop]

// Wait until all sprites are fade out
[/sprite][wait=sprite]

// Wait camera fade out
[camera.fadeout][wait=camera.fadeout]
`

        var text = this.add.rexTextPlayer(
            {
                x: 400, y: 500,
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
                    speed: 200,
                },

                sprites: {
                    fade: 500
                }

            }
        )

        var print = this.add.text(0, 580, 'Click to start');
        this.input.once('pointerdown', function () {
            text.playPromise(content)
                .then(function () {
                    print.setText('Play complete');
                    console.log('Play complete');
                })

            // text.showPage();  // Show all characters in this page
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