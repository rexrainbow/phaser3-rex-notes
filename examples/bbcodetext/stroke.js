import phaser from 'phaser/src/phaser.js';
import BBCodeTextPlugin from '../../plugins/bbcodetext-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var txt0 = this.add.text(
            200, 250,
            'HelloLLHelloLL',
            {
                fontSize: 40,
                strokeThickness: 8,
                stroke: 'red',
                backgroundColor: '#333333',
            }
        )
        console.log(txt0.width);

        var txt1 = this.add.rexBBCodeText(
            200, 350,
            '[stroke]HelloLL[/stroke][stroke]HelloLL[/stroke]',
            {
                fontSize: 40,
                strokeThickness: 8,
                stroke: 'red',
                backgroundColor: '#333333',
            }
        )
        console.log(txt1.width);

        this.graphics = this.add.graphics({
            lineStyle: {
                color: 0xffffff
            }
        });
    }

    update() {
        this.graphics.clear();

        var pointer = this.input.activePointer;
        this.graphics.lineBetween(pointer.x, 0, pointer.x, 600);
    }
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
            key: 'BBCodeTextPlugin',
            plugin: BBCodeTextPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);