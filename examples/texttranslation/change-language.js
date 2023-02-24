import phaser from 'phaser/src/phaser.js';
import TextTranslationPlugin from '../../plugins/texttranslation-plugin.js';
import BBCodeTextPlugin from '../../plugins/bbcodetext-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.plugins.get('TextTranslation').initI18Next({
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
        textObject.translation = this.plugins.get('TextTranslation').add(textObject);
        textObject.translation.setText('save');

        var bbCodeTextObject = this.add.rexBBCodeText(300, 300, '');
        bbCodeTextObject.translation = this.plugins.get('TextTranslation').add(bbCodeTextObject);
        bbCodeTextObject.translation.setText('save');

        this.input.once('pointerdown', function () {
            this.plugins.get('TextTranslation').changeLanguage('zh');
        }, this)

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
    plugins: {
        global: [
            {
                key: 'TextTranslation',
                plugin: TextTranslationPlugin,
                start: true
            },
            {
                key: 'BBCodeTextPlugin',
                plugin: BBCodeTextPlugin,
                start: true
            }
        ]
    }
};

var game = new Phaser.Game(config);