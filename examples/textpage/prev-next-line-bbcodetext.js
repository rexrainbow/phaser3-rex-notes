import phaser from 'phaser/src/phaser.js';
import TextPagePlugin from '../../plugins/textpage-plugin.js';
import BBCodeTextPlugin from '../../plugins/bbcodetext-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        this.textPage = this.plugins.get('rexTextPage');

        var lines = [];
        for (var i = 0; i < 50; i++) {
            var s;
            if (i < 20) {
                s = `[size=40]${i}[/size]`
            } else {
                s = `[size=20]${i}[/size]`
            }
            lines.push(s);
        }

        var txt = this.add.rexBBCodeText(100, 100, '', {
            fixedLineHeightMode: false,
            fontSize: 20,
            backgroundColor: '#555',
            fixedWidth: 200,
            fixedHeight: 200,
            padding: 10
        })
        txt.page = this.textPage.add(txt, {
            //text: lines
        });
        txt.page.setText(lines);
        txt.page.showNextLine();

        this.input.keyboard.on('keydown-DOWN', txt.page.showNextLine, txt.page);
        this.input.keyboard.on('keydown-UP', txt.page.showPreviousLine, txt.page);
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
        global: [
            {
                key: 'rexTextPage',
                plugin: TextPagePlugin,
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