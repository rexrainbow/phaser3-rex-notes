import 'phaser';
import TextPagePlugin from '../../plugins/textpage-plugin.js'

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
        for (var i = 0; i < 55; i++) {
            lines.push(`${i}\n`);
            if ((i % 10) === 9) {
                lines.push('Page-break here<PB>\n');
            }
        }
        lines = lines.join('')

        var txt = this.add.text(100, 100, '', {
            wordWrap: {
                width: 300
            },
            maxLines: 7,

            fixedWidth: 200,
            fixedHeight: 130,
            backgroundColor: '#0000CD'
        });
        txt.page = this.textPage.add(txt, {
            pageBreak: '<PB>\n',
            //text: lines
        });
        txt.page.setText(lines);
        txt.page.showPage();

        this.input.keyboard.on('keydown-DOWN', txt.page.showNextPage, txt.page);
        this.input.keyboard.on('keydown-UP', txt.page.showPreviousPage, txt.page);


        var printPageIdx = function () {
            var page = txt.page;
            var s = page.pageIndex + "/" + page.pageCount
            if (page.isLastPage) {
                s += "-- last page"
            }
            console.log(s);
        }
        printPageIdx();
        this.input.keyboard.on('keydown-UP', printPageIdx);
        this.input.keyboard.on('keydown-DOWN', printPageIdx);
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