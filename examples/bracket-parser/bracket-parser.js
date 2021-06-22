import 'phaser';
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
        var source = '<fn0>Hello<fn1=0>World<pause><fn2=abcd, -3.2, 1.5><aa>Phaser3</aa>End';
        var parser = this.plugins.get('rexBracketParserPlugin').add({
            // delimiters: '<>'
        });
        parser
            .on('content', function (content) {
                console.log('content:', content);
            })
            .on('+fn0', function (value) {
                console.log('Run fn0');
                // parser.skipEvent();  // Don't fire '+' event
            })
            .on('+fn1', function (value) {
                console.log(`Run fn1(${value})`);
                // parser.skipEvent();  // Don't fire '+' event
            })
            .on('+fn2', function (values) {
                console.log(`Run fn2(${JSON.stringify(values)})`);
                // parser.skipEvent();  // Don't fire '+' event
            })
            .on('+pause', function () {
                console.log('--- Pause ---');
                parser.pause(); // Pause parsing
                // parser.skipEvent();  // Don't fire '+' event
            })
            .on('+', function (tag, value) {
                console.log('tag-start:', tag, value);
            })
            .on('-', function (tag) {
                console.log('tag-end:', tag);
            })
            .on('start', function(){
                console.log('start');
            })
            .on('complete', function () {
                console.log('complete');
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