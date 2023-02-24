import phaser from 'phaser/src/phaser.js';
import i18next from 'i18next';
import TextTranslationBehavior from '../../plugins/texttranslation.js';
import BBCodeText from '../../plugins/bbcodetext.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        i18next.init({
            resources: {
                'en': {
                    'ui': {
                        'save': 'Save'
                    }
                },
                'zh': {
                    'ui': {
                        'save': '儲存'
                    }
                },
            },
            lng: 'en',
            ns: 'ui'
        })
    }

    create() {
        var textObject = this.add.text(100, 300, '');
        textObject.translation = new TextTranslationBehavior(textObject);
        textObject.translation.setText('save');

        var bbCodeTextObject = new BBCodeText(this, 300, 300, '');
        this.add.existing(bbCodeTextObject);
        bbCodeTextObject.translation = new TextTranslationBehavior(bbCodeTextObject);
        bbCodeTextObject.translation.setText('save');

        this.input.once('pointerdown', function () {
            i18next.changeLanguage('zh');
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
    scene: Demo,
};

var game = new Phaser.Game(config);