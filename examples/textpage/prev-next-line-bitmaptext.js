import phaser from 'phaser/src/phaser.js';
import TextPagePlugin from '../../plugins/textpage-plugin.js'

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.bitmapFont('gothic', 'assets/fonts/gothic.png', 'assets/fonts/gothic.xml');
    }

    create() {
        this.textPage = this.plugins.get('rexTextPage');

        var lines = [];
        for (var i = 0; i < 20; i++) {
            lines.push(i.toString());
        }

        var txt = this.add.bitmapText(100, 100, 'gothic')
            .setFontSize(20)
            .setMaxWidth(500)
        txt.page = this.plugins.get('rexTextPage').add(txt, {
            //text: lines
            maxLines: 7
        });
        txt.page.setText(lines);
        txt.page.showPage();

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
        global: [{
            key: 'rexTextPage',
            plugin: TextPagePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);