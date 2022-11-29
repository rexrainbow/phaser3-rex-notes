import phaser from 'phaser/src/phaser.js';
import BracketParser from '../../plugins/logic/bracketparser/bracketparser2/BracketParser.js';

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
]]
Phaser

[[
    fn1
    p0=0 
    p1=abc
    p2="def ghi"
]] 
End
`;

        console.log(source);

        var parser = new BracketParser({
            delimiters: ['[[', ']]']
        })
        parser
            .on('content', function (content) {
                console.log('content:', content);
            })
            .on('tag', function (name, payload) {
                console.log(`Tag:${name}, payload=${JSON.stringify(payload)}`);
            })

            .start(source);

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
};

var game = new Phaser.Game(config);