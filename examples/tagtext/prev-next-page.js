import TagTextPlugin from '../../plugins/tagtext-plugin.js';
import TextPagePlugin from '../../plugins/textpage-plugin.js'

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var lines = [],
            txt, classBegin = false;
        for (var i = 0; i < 50; i++) {
            if ((i % 4) === 0) {
                if (classBegin) {
                    txt = '</class>';
                } else {
                    txt = '';
                }
                txt += '<class="yellow">' + i.toString() + ' :yellow';
                classBegin = true;
            } else if ((i % 3) === 0) {
                if (classBegin) {
                    txt = '</class>';
                } else {
                    txt = '';
                }
                txt += '<class="gray">' + i.toString() + ' :gray';
                classBegin = true;
            } else {
                txt = i.toString();
            }

            if (i === 49) {
                if (classBegin) {
                    txt += '</class>';
                }
            }
            lines.push(txt);
        }

        console.log(lines.join('\n'));
        var tags = {
            yellow: {
                color: 'yellow'
            },
            gray: {
                color: 'gray'
            }
        }
        var txt = this.add.rexTagText(100, 100, '', {
            wordWrap: {
                width: 500
            },
            maxLines: 7,

            tags: tags
        });
        txt.page = new TextPagePlugin(txt, {
            //text: lines
        });
        txt.page.setText(lines);
        txt.page.showPage();

        this.input.keyboard.on('keydown_DOWN', txt.page.showNextPage, txt.page);
        this.input.keyboard.on('keydown_UP', txt.page.showPreviousPage, txt.page);


        var printPageIdx = function () {
            var page = txt.page;
            var s = page.pageIdx + "/" + page.pageCount
            if (page.isLastPage) {
                s += "-- last page"
            }
            console.log(s);
        }
        printPageIdx();
        this.input.keyboard.on('keydown_UP', printPageIdx);
        this.input.keyboard.on('keydown_DOWN', printPageIdx);
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
            key: 'TagTextPlugin',
            plugin: TagTextPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);