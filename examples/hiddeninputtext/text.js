import phaser from 'phaser/src/phaser.js';
import HiddenInputTextPlugin from '../../plugins/hiddeninputtext-plugin.js'

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var textObject = this.add.text(300, 200, '', {
            fixedWidth: 300,
            fixedHeight: 200,
            backgroundColor: '#222222',
        })

        this.plugins.get('rexHiddenInputText').add(textObject, {
            type: 'textarea',
            enterClose: false,

            onOpen(textObject) {
                textObject.setBackgroundColor('#555555')
            },

            onClose(textObject) {
                textObject.setBackgroundColor('#222222')
            }
        })
    }

    update() {

    }
}

var config = {
    type: Phaser.AUTO,
    scale: {
        parent: 'phaser-example',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600,
    },
    dom: {
        createContainer: true
    },
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexHiddenInputText',
            plugin: HiddenInputTextPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);