import phaser from 'phaser/src/phaser.js';
import TextWrapByCharCallback from '../../plugins/utils/text/TextWrapByCharCallback';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var textObject = this.add.text(200, 200, '一二三四五六七八九零一二三四五六七八九零一二三四五六七八九零一二三四五六七八九零', {
            backgroundColor: 'grey',
            testString: '|MÉqgy回',
            fixedWidth: 200,
            wordWrap: {
                width: 200,
                callback: TextWrapByCharCallback
            }
        });
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
    scene: Demo
};

var game = new Phaser.Game(config);