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
        txt.page = this.plugins.get('rexTextPage').add(txt, {
            //text: lines
        });
        txt.page.setText(lines);
        txt.page.showPage();

        this.input.keyboard.on('keydown-DOWN', txt.page.showNextPage, txt.page);
        this.input.keyboard.on('keydown-UP', txt.page.showPreviousPage, txt.page);


        var printPageIdx = function () {
            var page = txt.page;
            var s = `${page.pageIndex + 1}/${page.pageCount}`;
            if (page.pageIndex === 0) {
                s += '-- first page'
            } else if (page.isLastPage) {
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