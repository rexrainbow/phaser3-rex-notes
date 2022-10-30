import phaser from 'phaser/src/phaser.js';
import SoundFadePlugin from '../../plugins/soundfade-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
        this.txt;
        this.music;
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
            // Music is playing
            if (this.music) {
                return;
            }

            this.music = this.sound.add('theme')
                .on('destroy', function () {
                    this.music = undefined;
                    this.print.text = '--'
                }, this)
                .on('volume', function (music, volume) {
                    this.print.text = `${music.volume}, ${volume}`;
                }, this)
            
            soundFadeIn(this.music, 3000);

            // or
            //this.music = soundFadeIn(this, 'theme', 3000);        

            // fade-out volume then destroy sound instance
            this.time.delayedCall(4000, SoundFadeOut, [this.music, 3000]);
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