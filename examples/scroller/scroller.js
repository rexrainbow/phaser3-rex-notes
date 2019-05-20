import ScrollerPlugin from '../../plugins/scroller-plugin.js';

const slidingDeceleration = 5000;
const backDeceleration = 2000;

const pad = Phaser.Utils.String.Pad;
class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('knighthawks', 'assets/fonts/knighthawks-font-filled.png');
    }

    create() {
        var x = 400,
            y = 300,
            w = 300,
            h = 400;
        var topY = y - (h / 2),
            leftX = x - (w / 2);
        var bg = this.add.graphics()
            .setPosition(leftX, topY)
            .fillStyle(0x000033, 1)
            .fillRect(0, 0, w, h)
            .setInteractive(new Phaser.Geom.Rectangle(0, 0, w, h),
                Phaser.Geom.Rectangle.Contains);


        var s = '';
        for (var i = 0, cnt = 1000; i < cnt; i++) {
            s += pad(i.toString(), 4, '0', 1);
            if (i < (cnt - 1)) {
                s += '\n';
            }
        }

        var config = {
            image: 'knighthawks',
            width: 31,
            height: 25,
            chars: Phaser.GameObjects.RetroFont.TEXT_SET2,
            charsPerRow: 10,
            spacing: {
                x: 1,
                y: 1
            }
        };

        this.cache.bitmapFont.add('knighthawks', Phaser.GameObjects.RetroFont.Parse(this, config));
        var txt = this.add.bitmapText(leftX, topY, 'knighthawks', s).setScale(2);
        txt.setMask(bg.createGeometryMask());

        var topBound = topY,
            bottomBound;
        var contentHieght = txt.height;
        if (contentHieght > h) {
            // over a page
            bottomBound = topY - contentHieght + h;
        } else {
            bottomBound = topY;
        }
        this.scroller = this.plugins.get('rexScroller').add(bg, {
            bounds: [
                bottomBound,
                topBound
            ],
            value: topBound,
            slidingDeceleration: slidingDeceleration,
            backDeceleration: backDeceleration,

            valuechangeCallback: function(newValue) {
                txt.y = newValue;
            }
        });

        this.scrollerState = this.add.text(0, 0, '');
    }

    update() {
        this.scrollerState.text = this.scroller.state + "\n" + this.scroller.value;
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
    backgroundColor: 0x333333,
    plugins: {
        global: [{
            key: 'rexScroller',
            plugin: ScrollerPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);