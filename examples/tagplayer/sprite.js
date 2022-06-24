import phaser from 'phaser/src/phaser.js';
import TagPlayer from '../../plugins/logic/bracketparser/tagplayer/TagPlayer.js';

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
// Comments : dude sprite
[sprite.dude=dude]
[sprite.dude.x=100][sprite.dude.x.to=700,5000,Cubic]
[sprite.dude.y=300][sprite.dude.y.yoyo=100,300,-1]

// knight sprite
[sprite.knight.play=idle,guard]
[sprite.knight.x=400][sprite.knight.y=300]

[wait=1000]
[text]
Hello\\n
Phaser\\n
World

[wait=sprite.dude.x][/sprite.dude]
[sprite.knight.stop]

// Wait until all sprites are fade out
[/sprite][wait=sprite]

[/text]
`

        var print;
        var tagPlayer = new TagPlayer(this);
        tagPlayer
            .on('+text', function () {
                if (print) {
                    return;
                }
                print = this.add.text(0, 0, '')
            }, this)
            .on('+text#content', function (parser, content) {
                if (!print) {
                    return;
                }
                content = content.replaceAll('\\n', '\n')
                print.setText(content);
            })
            .on('-text', function () {
                if (!print) {
                    return;
                }
                print.destroy();
                print = undefined;
            })

        tagPlayer
            .playPromise(content)
            .then(function () {
                console.log('Complete')
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
    scene: Demo
};

var game = new Phaser.Game(config);