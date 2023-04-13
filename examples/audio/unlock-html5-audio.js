import phaser from 'phaser/src/phaser.js';

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
        this.load.audio('theme0', [
            'assets/audio/oedipus_wizball_highscore.ogg',
            'assets/audio/oedipus_wizball_highscore.mp3'
        ]);

    }

    create() {
        this.add.text(0, 300, 'Play sound\nIn SceneA')
            .setInteractive()
            .once('pointerdown', function () {
                this.sound.play('theme0')
            }, this)

        /* ipad safari:
           1. any pointerdown to unlock loaded audio
           2. pointerdown on text to play sound
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
        this.load.audio('theme1', [
            'assets/audio/jungle.ogg',
            'assets/audio/jungle.mp3'
        ]);
    }

    create() {
        this.add.text(400, 300, 'Play sound\nIn SceneB')
        this.sound.play('theme1')

        /* ipad safari:
           1. any pointerdown to unlock loaded audio
           2. audio will be played automatically
        */
    }

    update() { }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    audio: {
        disableWebAudio: true
    },
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [Boot, SceneA, SceneB]
};

var game = new Phaser.Game(config);