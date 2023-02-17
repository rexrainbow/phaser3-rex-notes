import phaser from 'phaser/src/phaser.js';
import i18next from 'i18next';

i18next.init();  // Can run `18next.init()` before creating game instance

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        // i18next.init();  // Can run `18next.init()` here

        i18next.addResourceBundle('en', 'translation', {
            key: 'hello world'
        });
        // Default namespace is 'translation'
    }

    create() {
        i18next.changeLanguage('en');
        console.log(i18next.t('key'))
        // console.log(i18next.t('key', { ns: 'translation' }))
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