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
        this.load.audio('fate', [
            'assets/audio/fate.ogg',
            'assets/audio/fate.mp3',
        ]);
    }

    create() {
        this.txt = this.add.text(0, 0, '');
        this.input.on('pointerdown', this.runTest, this);
    }

    runTest() {
        // Music is playing
        if (this.music) {
            return;
        }

        this.music = this.sound.add('fate');
        var soundFadeIn = this.plugins.get('rexSoundFade').fadeIn;
        soundFadeIn(this, this.music, 3000);

        // or
        //this.music = soundFadeIn(this, 'fate', 2000);        

        this.music.on('destroy', function () {
            this.music = undefined;
        }, this);

        // fade-out volume then destroy sound instance
        var soundFadeOut = this.plugins.get('rexSoundFade').fadeOut;
        this.time.delayedCall(4000, soundFadeOut, [this, this.music, 3000]);
    }

    update() {
        var volume, state, playbackTime
        if (this.music) {
            volume = this.music.volume;
            state = (this.music.isPlaying) ? 'playing' : 'end';
            playbackTime = this.music.seek;
        } else {
            volume = '--';
            state = '--';
            playbackTime = '--';
        }
        this.txt.text = `Volume: ${volume} (${state}, ${playbackTime})`;
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