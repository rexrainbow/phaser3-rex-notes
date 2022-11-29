import phaser from 'phaser/src/phaser.js';
import BracketParserPlugin from '../../plugins/bracketparser2-plugin.js';


class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
        this.print;
    }

    preload() { }

    create() {
        var source = `\
[[
    fn0 
    p0=0 
    p1=abc
    p2="def ghi"
    p3=false
]]
Phaser

[[pause]]

[[fn1]] 
ABC
[[/fn1]] 
End
`;

        console.log(source);

        var parser = this.plugins.get('rexBracketParserPlugin').add({
            delimiters: ['[[', ']]']
        })
        parser
            .on('content', function (content) {
                console.log('content:', content);
            })
            .on('+pause', function () {
                console.log('--- Pause ---');
                parser.pause(); // Pause parsing
                // parser.skipEvent();  // Don't fire '+' event
            })
            .on('+', function (name, payload) {
                console.log(`+${name}, payload=${JSON.stringify(payload)}`);
            })
            .on('-', function (name, payload) {
                console.log(`-${name}, payload=${JSON.stringify(payload)}`);
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