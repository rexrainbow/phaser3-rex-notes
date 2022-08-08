import phaser from 'phaser/src/phaser.js';
import TagPlayerPlugin from '../../plugins/tagplayer-plugin.js';
import BBCodeTextPlugin from '../../plugins/bbcodetext-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {

    }

    create() {
        var content = `
[[text.a]]
[[text.a.x=300]]
[[text.a.y=100]]
[[text.a.typing=100]]

[b][color=yellow]H[/color][/b]ello\\n
[u=red]Phaser[/u]\\n
World
`

        var tagPlayer = this.plugins.get('rexTagPlayerPlugin').add(this, {
            parser: {
                delimiters: ['[[', ']]'],
            },
            texts: {
                createGameObject: CreateTextBox
            }
        })
            .play(content)
    }

    update() { }
}

var CreateTextBox = function (scene) {
    return scene.add.rexBBCodeText(0, 0, '', {
        underline: {
            color: '#000',
            thickness: 2,
            offset: 1
        }
    });
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
                key: 'rexTagPlayerPlugin',
                plugin: TagPlayerPlugin,
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