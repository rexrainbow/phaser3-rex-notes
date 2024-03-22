import phaser from 'phaser/src/phaser.js';
import WebFontLoaderPlugin from '../../plugins/webfontloader-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {

        this.load.rexWebFont({
            custom: {
              families: ['SEASRN'],
              urls: ['assets/fonts/SeasideResortNF/fonts.css']
            }
          });
    }

    create() {
        this.add.text(100, 100, 'Hello ', {
            fontFamily: 'SEASRN',
            fontSize: '64px'
        })
    }

    update() {}
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
            key: 'WebFontLoader',
            plugin: WebFontLoaderPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);