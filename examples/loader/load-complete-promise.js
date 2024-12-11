import phaser from 'phaser/src/phaser.js';
import LoadCompletePromise from '../../plugins/utils/loader/LoadCompletePromise';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        LoadCompletePromise(this, {
            type: 'image',
            key: 'classroom',
            url: 'assets/images/backgrounds/classroom.png'
        })
            .then(function (result) {
                console.log(result)
            })
    }

    create() {
        this.add.image(400, 300, 'classroom');
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
    scene: Demo
};

var game = new Phaser.Game(config);