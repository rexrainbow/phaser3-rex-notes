import phaser from 'phaser/src/phaser.js';
import { Howl, Howler } from 'howler';
import Awaitloader from '../../plugins/awaitloader.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.howlSounds = {};
        Awaitloader.call(this.load, function (successCallback, failureCallback) {
            var sound = new Howl({
                src: [
                    'assets/audio/oedipus_wizball_highscore.ogg',
                    'assets/audio/oedipus_wizball_highscore.mp3'
                ]
            });
            this.howlSounds['highscore'] = sound;

            // Clear listener after first call.
            sound.once('load', successCallback);
        }, this)
    }

    create() {
        this.input.once('pointerdown', function () {
            var sound0, sound1, sound2;

            this.time.delayedCall(0, function () {
                sound0 = this.howlSounds['highscore'].play()
                console.log(sound0)
            }, [], this)

            this.time.delayedCall(100, function () {
                sound1 = this.howlSounds['highscore'].play()
                console.log(sound1)
            }, [], this)

            this.time.delayedCall(200, function () {
                sound2 = this.howlSounds['highscore'].play()
                console.log(sound2)

                // this.howlSounds['highscore'].stop(sound0)
                // this.howlSounds['highscore'].stop(sound1)
                // this.howlSounds['highscore'].stop(sound2)
            }, [], this)


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
    scene: Demo
};

var game = new Phaser.Game(config);