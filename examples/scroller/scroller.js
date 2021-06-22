import 'phaser';
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
        this.load.bitmapFont('gothic', 'assets/fonts/gothic.png', 'assets/fonts/gothic.xml');
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
        for (var i = 0, cnt = 300; i < cnt; i++) {
            s += pad(i.toString(), 4, '0', 1);
            if (i < (cnt - 1)) {
                s += '\n';
            }
        }

        var txt = this.add.bitmapText(leftX, topY, 'gothic', s);
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