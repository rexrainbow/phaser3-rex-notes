import phaser from 'phaser/src/phaser.js';

class SceneA extends Phaser.Scene {
    constructor() {
        super({
            key: 'SceneA'
        })
    }

    preload() {
        for (var i = 0; i < 10; i++) {
            this.load.audio(`music-${i}`, [
                'assets/audio/oedipus_wizball_highscore.ogg',
                'assets/audio/oedipus_wizball_highscore.mp3'
            ]);
        }
    }

    create() {
        this.add.text(0, 0, 'SceneA')
        this.input.once('pointerdown', function () {
            for (var i = 0; i < 10; i++) {
                this.cache.audio.remove(`music-${i}`)
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
    scene: [SceneA, SceneB]
};

var game = new Phaser.Game(config);