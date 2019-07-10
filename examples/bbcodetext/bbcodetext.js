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
        var s1 = `123456[color=blue]AA[/color]
[i][color=red]B
B[/color][b]CC[/b][/i]DD[size=10]D[size=20]D[size=30][u]D[size=40]D[/u][size=50]D[/size]D
[size=20][u=red]EEE[/u][/size][shadow]FFF[/shadow][color=none][stroke]GGG[/stroke][stroke=blue]GGG[/stroke]
[color=white][size=36]This is a [img=key]`;
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
            }
        });
        console.log(text.getWrappedText());
        console.log(text.getPlainText());
        console.log(text.getText(undefined, 1, 4));

    }

    update() {}
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