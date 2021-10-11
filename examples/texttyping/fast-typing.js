import 'phaser';
import TextTypingPlugin from '../../plugins/texttyping-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var s = `\
Phaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. You can use JavaScript or TypeScript for development.\
`;

        var txt0 = this.add.text(100, 100, '', { wordWrap: { width: 500 } });
        txt0.typing = this.plugins.get('rexTextTyping').add(txt0, {
            wrap: true,
            speed: 16,
        });
        txt0.typing.start(s);

        var txt1 = this.add.text(100, 400, '', { wordWrap: { width: 500 } });
        txt1.typing = this.plugins.get('rexTextTyping').add(txt1, {
            wrap: true,
            speed: 2,
        });
        txt1.typing.start(s);
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
        global: [{
            key: 'rexTextTyping',
            plugin: TextTypingPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);