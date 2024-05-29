import phaser from 'phaser/src/phaser.js';
import TagTextPlugin from '../../plugins/tagtext-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('key', 'assets/images/key.png');
    }

    create() {
        var s = `\
Phaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. You can use JavaScript or TypeScript for development.\
`;
        var text = this.add.rexTagText(100, 100, s, {
            backgroundColor: '#555',
            fontSize: '20px',
            wrap: {
                mode: 'word',
                width: 300
            },
        });
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
            key: 'TagTextPlugin',
            plugin: TagTextPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);