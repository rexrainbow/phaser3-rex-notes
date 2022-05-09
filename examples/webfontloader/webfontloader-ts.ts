import 'phaser';
import WebFontLoader from '../../plugins/webfontloader';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        WebFontLoader.call(this.load, {
            google: {
                families: ['Bangers']
            }
        });
        this.load.on('webfontactive', function (fileObj, familyName) {
            console.log('font-active: ' + familyName)
        });
        this.load.on('webfontinactive', function (fileObj, familyName) {
            console.log('font-inactive: ' + familyName)
        })
    }

    create() {
        this.add.text(100, 100, 'Hello ', {
            fontFamily: 'Bangers',
            fontSize: '64px'
        })
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