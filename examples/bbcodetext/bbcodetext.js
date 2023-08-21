import phaser from 'phaser/src/phaser.js';
import BBCodeTextPlugin from '../../plugins/bbcodetext-plugin.js';

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
        var s1 = `[size=20]1[y=-4]2[y=-8]3[y=-12]4[y=-16]5[/y]6[/size][color=blue]AA[/color]
[i][color=red]B
B[/color][b]CC[/b][/i]DD[size=10]D[size=20]D[size=30][u]D[size=40]D[/u][size=50]D[/size]D
[size=20][u=red]EEE[/u][/size][shadow]FFF[/shadow][color=none][stroke]GGG[/stroke][color=green][stroke=black]GGG[/stroke][/color]
[color=white][size=36]This is a [img=key]
[s][u]Last line[/u][/s]`;
        var text = this.add.rexBBCodeText(100, 30, s1, {
            backgroundColor: '#555',
            fontSize: '60px',
            align: 'right',
            wrap: {
                mode: 'char',
                width: 200
            },

            stroke: 'red',
            strokeThickness: 1,
            shadow: {
                offsetX: 5,
                offsetY: 5,
                blur: 5,
                color: 'yellow'
            },

            underline: {
                color: '#000',
                thickness: 2,
                offset: 1
            },

            strikethrough: {
                color: 'red',
                thickness: 2,
                offset: -8
            }
        });
        console.log(text.getWrappedText());
        console.log(text.getPlainText());
        console.log(text.getText(1, 4));

        this.input.once('pointerdown', function () {
            // Change size of image
            text.addImage('key', {
                key: 'key',
                width: 64,
            })

            text.updateText()
        })


        var s2 = `[color=red]red[/color]
[color=blue]blue[/color]
[color=green]green[/color]
[esc][b]Text[/b][/esc]:[b]Text[/b]
Last line`;

        this.add.rexBBCodeText(400, 30, s2, {
            fontSize: '30px',
            backgroundColor: '#888',
            backgroundColor2: '#222',
            backgroundHorizontalGradient: false,
            backgroundStrokeColor: 'red',
            backgroundStrokeLineWidth: 2,
            backgroundCornerRadius: -20,
            // backgroundCornerIteration: 0,
            padding: 20
        })

        var s3 = `\
Hello
[b]Hello[/b]
[weight=100]Hello[/weight]
[weight=600]Hello[/weight]
[weight=900]Hello[/weight]\
`
        this.add.rexBBCodeText(400, 300, s3, {
            fontFamily: 'Arial',
            fontSize: 30,
            backgroundColor: '#888',
            backgroundColor2: '#222',
            padding: 20
        })

        var s4 = `\
<color=red>[color=]</color>
<color=blue>[color=]</color>
<color=green>[color=]</color>\
`

        this.add.rexBBCodeText(600, 300, s4, {
            delimiters: '<>',
            fontFamily: 'Arial',
            fontSize: 20,
            backgroundColor: '#555',
            padding: 10
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
            key: 'BBCodeTextPlugin',
            plugin: BBCodeTextPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);