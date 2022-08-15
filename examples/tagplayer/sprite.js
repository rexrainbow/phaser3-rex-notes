import phaser from 'phaser/src/phaser.js';
import TagPlayerPlugin from '../../plugins/tagplayer-plugin.js';

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

// extDude
[sprite.extDude.x.to=1000,5000]

[wait=1000]

[text.a]
[text.a.x=300]
[text.a.y=100]
[text.a.setColor=yellow]
[text.a.typing]
Hello\\n
Phaser\\n
World

[text.b]
[text.b.x=100][text.a.x.to=300,1000,Cubic]
[text.b.y=500]
[text.b.text]
2nd text

[text.c=knight]
[text.c.typing]
For the King



[wait=sprite.dude.x][/sprite.dude]
[sprite.knight.stop]

[/text]

// Wait until all sprites are fade out
[/sprite][wait=sprite]
`

        var extDude = this.add.image(100, 100, 'dude');
        var tagPlayer = this.plugins.get('rexTagPlayerPlugin').add(this, {
            texts: {
                createGameObject: CreateText
            }
        })
            .addSprite('extDude', extDude)
            .playPromise(content)
            .then(function () {
                console.log('Complete')
            })
    }

    update() { }
}

var CreateText = function (scene, spriteName) {
    var textObject = scene.add.text(0, 0, '', {

    });

    if (spriteName) {
        var sprite = this.getSprite(spriteName);  // this = tagPlayer
        textObject.setPosition(sprite.x, sprite.y - 20);
    }

    return textObject;
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
        }]
    }
};

var game = new Phaser.Game(config);