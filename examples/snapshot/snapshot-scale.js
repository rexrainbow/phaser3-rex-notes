import phaser from 'phaser/src/phaser.js';
import SoundFadePlugin from '../../plugins/soundfade-plugin.js';

const Format = Phaser.Utils.String.Format;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
        this.txt;
        this.music;
    }

    preload() {
        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
    }

    create() {
        this.baseImage = this.add.image(0, 0, 'classroom').setOrigin(0).setScale(0.5);
        this.cameras.main
            .setZoom(0.75)
            // .setScroll(-100, -100)

        this.time.delayedCall(100, function (scene) {
            Snapshot(scene)
        }, [this]);
    }

    update() {
    }
}

var Snapshot = function (scene) {
    scene.game.renderer.snapshotArea(0, 0, 200, 200, function (image) {
        scene.textures.addImage('area', image);
        scene.baseImage.setAlpha(0.5);
        scene.add.image(0, 0, 'area').setOrigin(0);
    });
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
            key: 'rexSoundFade',
            plugin: SoundFadePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);