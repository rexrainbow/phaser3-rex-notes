import phaser from 'phaser/src/phaser.js';
import HowlerSoundManager from '../../plugins/utils/audio/howlersoundmanager/HowlerSoundManager';
import Awaitloader from '../../plugins/awaitloader.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.howlSoundManager = new HowlerSoundManager();
        Awaitloader.call(this.load, function (successCallback, failureCallback) {
            this.howlSoundManager.load('highscore', [
                'assets/audio/oedipus_wizball_highscore.ogg',
                'assets/audio/oedipus_wizball_highscore.mp3'
            ], successCallback)
        }, this)
    }

    create() {
        this.input.once('pointerdown', function () {
            this.time.delayedCall(0, function () {
                this.howlSoundManager.play('highscore')
            }, [], this)

            this.time.delayedCall(100, function () {
                this.howlSoundManager.play('highscore')
            }, [], this)

            this.time.delayedCall(200, function () {
                this.howlSoundManager.play('highscore')
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