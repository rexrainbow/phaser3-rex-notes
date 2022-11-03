import phaser from 'phaser/src/phaser.js';
import SoundFadePlugin from '../../plugins/soundfade-plugin.js';

const Format = Phaser.Utils.String.Format;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
        this.txt;
    }

    preload() {
        this.load.audio('theme', [
            'assets/audio/oedipus_wizball_highscore.ogg',
            'assets/audio/oedipus_wizball_highscore.mp3'
        ]);
    }

    create() {
        this.print = this.add.text(0, 0, 'Click to start');

        var soundFadeIn = this.plugins.get('rexSoundFade').fadeIn;
        var SoundFadeOut = this.plugins.get('rexSoundFade').fadeOut;

        this.input.on('pointerdown', function () {
            var musice = this.sound.add('theme')
                .on('volume', function (music, volume) {
                    console.log(volume);
                }, this)

            soundFadeIn(musice, 3000);

            this.scene.stop();  // Stop current scene
        }, this);
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
            key: 'rexSoundFade',
            plugin: SoundFadePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);