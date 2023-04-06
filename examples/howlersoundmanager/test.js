import phaser from 'phaser/src/phaser.js';
import HowlerSoundManager from '../../plugins/utils/audio/howlersoundmanager/HowlerSoundManager';
import Awaitloader from '../../plugins/awaitloader.js';

var howlSoundManager = new HowlerSoundManager();

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        Awaitloader.call(this.load, function (successCallback, failureCallback) {
            howlSoundManager.load('highscore', [
                'assets/audio/oedipus_wizball_highscore.ogg',
                'assets/audio/oedipus_wizball_highscore.mp3'
            ], successCallback, failureCallback)
        })
    }

    create() {
        this.add.text(0, 0, 'Any click')
        this.input.once('pointerdown', function () {
            this.time.delayedCall(0, function () {
                howlSoundManager.play('highscore', true)
            })

            this.time.delayedCall(100, function () {
                howlSoundManager.play('highscore', true)
            })

            this.time.delayedCall(200, function () {
                howlSoundManager.play('highscore', true)
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
    scene: Demo
};

var game = new Phaser.Game(config);