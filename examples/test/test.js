'use strict'

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
        this.txt = this.add.text(0,0, '');
        this.music = this.sound.add('fate');
        this.music.play();
    }

    update() {
        var s = Format('%1 (%2)', [this.music.playTime, this.music.duration]);
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