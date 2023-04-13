import phaser from 'phaser/src/phaser.js';
import { Howl, Howler } from 'howler';
import AwaitLoaderPlugin from '../../plugins/awaitloader-plugin.js';

var HowlSounds = {};

class Boot extends Phaser.Scene {
    constructor() {
        super({
            key: 'boot'
        })
    }

    preload() {
    }

    create() {
        this.add.text(500, 300, 'Goto SceneA')
            .setInteractive()
            .once('pointerup', function () {
                this.scene.start('sceneA')
            }, this)
    }

    update() { }
}

class SceneA extends Phaser.Scene {
    constructor() {
        super({
            key: 'sceneA'
        })
    }

    preload() {
        this.load.rexAwait(function (successCallback, failureCallback) {
            var sound = new Howl({
                src: [
                    'assets/audio/oedipus_wizball_highscore.ogg',
                    'assets/audio/oedipus_wizball_highscore.mp3'
                ],
                html5: true
            });
            HowlSounds['theme0'] = sound;

            // Clear listener after first call.
            sound.once('load', successCallback);
        });
    }

    create() {
        this.add.text(0, 300, 'Play sound\nIn SceneA')
            .setInteractive()
            .once('pointerdown', function () {
                HowlSounds['theme0'].play()
            }, this)

        /* ipad safari:
        1. pointerdown on text to play sound 'theme0'
        */

        this.add.text(500, 300, 'Goto SceneB')
            .setInteractive()
            .once('pointerup', function () {
                this.scene.start('sceneB')
            }, this)
    }

    update() { }
}

class SceneB extends Phaser.Scene {
    constructor() {
        super({
            key: 'sceneB'
        })
    }

    preload() {
        this.load.rexAwait(function (successCallback, failureCallback) {
            var sound = new Howl({
                src: [
                    'assets/audio/jungle.ogg',
                    'assets/audio/jungle.mp3'
                ],
                html5: true
            });
            HowlSounds['theme1'] = sound;

            // Clear listener after first call.
            sound.once('load', successCallback);
        });
    }

    create() {
        this.add.text(400, 300, 'Play sound\nIn SceneB')
        HowlSounds['theme1'].play();

        /* ipad safari:
        1. can play sound 'theme1' directly wo any clicking
        (Click at end of previous scene?)
        */
    }

    update() { }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    audio: {
        noAudio: true
    },
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [Boot, SceneA, SceneB],
    plugins: {
        global: [{
            key: 'rexAwaitLoader',
            plugin: AwaitLoaderPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);