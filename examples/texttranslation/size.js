import phaser from 'phaser/src/phaser.js';
import i18next from 'i18next';
import TextTranslationBehavior from '../../plugins/texttranslation.js';
import Awaitloader from '../../plugins/awaitloader.js';
import BBCodeText from '../../plugins/bbcodetext.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        i18next.on('languageChanged', function (lng) {
            console.log(`Change language to '${lng}'`)
        });

        Awaitloader.call(this.load, function (successCallback, failureCallback) {
            i18next
                .init({
                    resources: {
                        'en': {
                            'ui': {
                                'save': 'Save'
                            }
                        },
                        'xxx': {
                            'ui': {
                                'save': '????????'
                            }
                        },
                    },
                    lng: 'en',
                    fallbackLng: 'en',
                    ns: 'ui'
                }, successCallback);
        })
        TextTranslationBehavior.setI18Next(i18next);
    }

    create() {
        var textObject = this.add.text(400, 300, '');
        textObject.translation = new TextTranslationBehavior(textObject, {
            translationKey: 'save'
        });

        this.input.once('pointerdown', function () {
            i18next.changeLanguage('xxx');
        })

        this.txt = textObject;
        this.txtWidth = textObject.width;
        this.txtHeight = textObject.height;

        this.print = this.add.text(0, 0, '');
        this.print.text += `${this.txtWidth}x${this.txtHeight}\n`
    }

    update() {
        if ((this.txt.width !== this.txtWidth) || (this.txt.height !== this.txtHeight)) {
            this.txtWidth = this.txt.width;
            this.txtHeight = this.txt.height;
            this.print.text += `${this.txtWidth}x${this.txtHeight}\n`
        }
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
};

var game = new Phaser.Game(config);