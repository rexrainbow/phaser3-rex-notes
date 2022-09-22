import phaser from 'phaser/src/phaser.js';
import HiddenTextEdit from '../../plugins/behaviors/hiddentextedit/HiddenTextEdit.js';

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

        var editor = new HiddenTextEdit(textObject,{
            // type: 'textarea',
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
    scene: Demo,
};

var game = new Phaser.Game(config);