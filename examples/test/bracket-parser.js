import BracketParser from '../../plugins/utils/bracketparser/BracketParser.js'

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var parser = new BracketParser({
            brackets: '<>'
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
            .start('<aa>bb</aa>cc<pause><dd=red>ee</dd>');

        this.input.on('pointerdown', function () {
            console.log('=== Continue ===')
            parser.next();
        })
    }

    update() {
    }
}

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo
};

var game = new Phaser.Game(config);