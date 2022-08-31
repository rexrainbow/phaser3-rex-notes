import phaser from 'phaser/src/phaser.js';
import TagPlayerPlugin from '../../plugins/tagplayer-plugin.js';

var content = `
// Comments : dude sprite
[sprite.A=dude]
[sprite.A.vpx=0][sprite.A.vpx.to=C]
[sprite.A.vpy=1][sprite.A.vpy.to=T]

[sprite.B=dude]
[sprite.B.vpx=1][sprite.B.vpx.to=C]
[sprite.B.vpy=0][sprite.B.vpy.to=B]

[wait=click]

// Wait until all sprites are fade out
[/sprite][wait=sprite]
`

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('dude', 'assets/images/phaser-dude.png');
    }

    create() {
        var tagPlayer = this.plugins.get('rexTagPlayerPlugin').add(this, {
            sprites: {
                fade: 500,
                viewportCoordinate: true,
                symbols: {
                    L: 0.3, T: 0.3,
                    C: 0.5,
                    R: 0.7, B: 0.7,
                }
            },          
        })
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