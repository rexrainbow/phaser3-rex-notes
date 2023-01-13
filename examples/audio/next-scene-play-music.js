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
        this.add.text(300, 300, 'SceneA')
            .setInteractive()
            .once('pointerup', function () {
                this.scene.start('sceneA')
            }, this)

        this.add.text(500, 300, 'SceneB')
            .setInteractive()
            .once('pointerup', function () {
                this.scene.start('sceneB')
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
        this.add.text(400, 300, 'SceneA')
        this.sound.play('theme0')
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
        this.add.text(400, 300, 'SceneB')
        this.sound.play('theme1')
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
    scene: [Boot, SceneA, SceneB]
};

var game = new Phaser.Game(config);