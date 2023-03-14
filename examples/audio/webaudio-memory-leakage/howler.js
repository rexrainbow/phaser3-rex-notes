import phaser from 'phaser/src/phaser.js';
import { Howl, Howler } from 'howler';
import AwaitLoaderPlugin from '../../../plugins/awaitloader-plugin.js';

class SceneA extends Phaser.Scene {
    constructor() {
        super({
            key: 'SceneA'
        })
    }

    preload() {
        this.howlSounds = [];
        for (var i = 0; i < 30; i++) {

            this.load.rexAwait(function (successCallback, failureCallback) {
                var sound = new Howl({
                    src: [
                        'assets/audio/oedipus_wizball_highscore.ogg',
                        'assets/audio/oedipus_wizball_highscore.mp3'
                    ]
                });
                this.howlSounds.push(sound);

                // Clear listener after first call.
                sound.once('load', successCallback);
            }, this);

        }
    }

    create() {
        this.add.text(0, 0, 'SceneA')
        this.input.once('pointerdown', function () {
            console.log(this.howlSounds.length)
            for (var i = 0, cnt = this.howlSounds.length; i < cnt; i++) {
                this.howlSounds[i].unload()
            }
            this.scene.start('SceneB')
        }, this)
    }

    update() { }
}

class SceneB extends Phaser.Scene {
    constructor() {
        super({
            key: 'SceneB'
        })
    }

    preload() {
    }

    create() {
        this.add.text(0, 0, 'SceneB')
    }

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
    scene: [SceneA, SceneB],
    plugins: {
        global: [{
            key: 'rexAwaitLoader',
            plugin: AwaitLoaderPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);