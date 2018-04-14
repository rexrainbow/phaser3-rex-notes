'use strict'

import soundFadeIn from './../../plugins/sound-fade-in.js';
import soundFadeOut from './../../plugins/sound-fade-out.js';

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
        var scene = this;

        this.txt = this.add.text(0, 0, '');

        
        this.music = soundFadeIn(scene, 'fate', 2000)
            .on('destroy', function () {
                scene.music = undefined;
            });

        this.time.delayedCall(3000, soundFadeOut, [scene, this.music, 2000]);
    }

    update() {
        var view;
        if (this.music) {
            view = [
                this.music.volume,
                (this.music.isPlaying) ? 'playing' : 'end',
                this.music.seek
            ];
        } else {
            view = [
                '--',
                '--',
                '--'
            ];
        }

        var s = Format('Volume: %1 (%2, %3)', view);
        this.txt.setText(s);
    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Demo
};

var game = new Phaser.Game(config);