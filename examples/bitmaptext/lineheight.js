import phaser from '../../../phaser/src/phaser.js';

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
        var lines = [];
        for (var i = 0; i < 5; i++) {
            lines.push(i)
        }
        var s = lines.join('\n')
        var txt = this.add.bitmapText(0, 0, 'gothic', s).setFontSize(30).setLineSpacing(20)

        var textSize = txt.getTextBounds()
        console.log(textSize)

        var lineHeight = (textSize.lines.height + txt.lineSpacing) * textSize.scale;
        console.log(textSize.lines.height, txt.lineSpacing, textSize.scale, lineHeight)
        var graph = this.add.graphics()
            .lineStyle(3, 0xff0000)

        for (var i = 1; i < 6; i++) {
            graph.lineBetween(0, i * lineHeight, 100, i * lineHeight);
        }
    }

    update(time) {
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
    scene: Demo
};

var game = new Phaser.Game(config);