import BracketParserPlugin from '../../plugins/bracketparser-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
        this.print;
    }

    preload() { }

    create() {
        var source = '<aa>bb</aa>cc<pause><dd=abcd, -3.2, 1.5>ee</dd>';
        var parser = this.plugins.get('rexBracketParserPlugin').add({
            // brackets: '<>'
        });
        parser
            .on('content', function (content) {
                console.log('content:', content);
            })
            .on('+', function (tag, value) {
                console.log('tag-start:', tag, value);
            })
            .on('-', function (tag) {
                console.log('tag-end:', tag);
            })
            .on('complete', function () {
                console.log('complete');
            })
            .on('+pause', function () {
                parser.pause();
            })
            .start(source);

        this.input.on('pointerdown', function () {
            console.log('=== Continue ===')
            parser.next();
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
    plugins: {
        global: [{
            key: 'rexBracketParserPlugin',
            plugin: BracketParserPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);