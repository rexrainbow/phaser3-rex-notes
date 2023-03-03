import phaser from 'phaser/src/phaser.js';
import SoundManeger from '../../plugins/utils/audio/soundmanager/SoundManager.js';
import { WaitEvent } from '../../plugins/utils/promise/WaitEvent.js';
import DelaySceneTick from '../../plugins/utils/promise/DelaySceneTick.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
        this.txt;
        this.music;
    }

    preload() {
        this.load.audio('theme0', [
            'assets/audio/oedipus_wizball_highscore.ogg',
            'assets/audio/oedipus_wizball_highscore.mp3'
        ]);
        this.load.audio('theme1', [
            'assets/audio/jungle.ogg',
            'assets/audio/jungle.mp3'
        ]);
    }

    async create() {
        var soundManger = new SoundManeger(this, {
            fade: 500
        })

        var txt = this.add.text(0, 0, 'Any click to start');

        await WaitEvent(this.input, 'pointerdown');

        var key = 'theme0';
        soundManger.playBackgroundMusic(key);
        txt.text = `Play ${key}`;

        await DelaySceneTick(this, 1000);

        var key = 'theme1';
        soundManger.playBackgroundMusic2(key);
        txt.text += `\nPlay ${key}`;

        await DelaySceneTick(this, 4000);

        soundManger.stopBackgroundMusic2(key);

        await DelaySceneTick(this, 4000);

        soundManger.stopBackgroundMusic(key);

        txt.text = '';
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
};

var game = new Phaser.Game(config);