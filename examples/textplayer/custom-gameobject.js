import phaser from 'phaser/src/phaser.js';
import TextPlayerPlugin from '../../plugins/textplayer-plugin.js';

var content = `
// Prelude
[char.A][char.A.play=idle]
[char.A.x=300][char.A.x.fromLeft=300,1000]
[char.A.y=300][char.A.y.fromUp=300,1000]

[char.B][char.B.toggleFlipX][char.B.play=idle]
[char.B.x=800][char.B.x.to=500,1000]
[char.B.y=600][char.B.y.to=300,1000]

[wait=1200]

Once upon a time...[r]

[char.A.x.toLeft=100,1000]
[char.B.x.toRight=100,1000]
[wait=1000]

Good bye...

[wait=500]

// Postlude
[/char][wait=char]
`

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
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
                    speed: 100,  // 0: no-typing
                },

                sounds: {
                    bgm: {
                        loop: true,
                        fade: 1000
                    }
                },

                clickTarget: this,
                nextPageInput: 'click'

            }
        )
            .addGameObjectManager({
                name: 'char',
                createGameObject: CreateGameObject
            })
            .playPromise(content)
            .then(function () {
                console.log('TextPlayer: Complete')
            })

    }

    update() { }
}

class MySprite extends Phaser.GameObjects.Container {
    constructor(scene, key, frame) {
        super(scene, 0, 0);

        this.sprite = new Phaser.GameObjects.Sprite(scene, 0, 0, key, frame);
        this.add(this.sprite);
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
}

var CreateGameObject = function (scene, key, frame) {
    var sprite = new MySprite(scene, key, frame);
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
            key: 'rexTextPlayer',
            plugin: TextPlayerPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);