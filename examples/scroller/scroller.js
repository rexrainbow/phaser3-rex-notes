'use strict'

import ScrollerPlugin from 'rexPlugins/scroller-plugin.js';

const pad = Phaser.Utils.String.Pad;
class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var x = 400,
            y = 300,
            w = 300,
            h = 400;
        var topY = y - (h / 2),
            leftX = x - (w / 2);
        var bg = this.add.graphics()
            .setPosition(leftX, topY)
            .fillStyle(0x333333, 1)
            .fillRect(0, 0, w, h)
            .setInteractive(new Phaser.Geom.Rectangle(0, 0, w, h),
                Phaser.Geom.Rectangle.Contains);


        var s = '';
        for (var i = 0, cnt = 100; i < cnt; i++) {
            s += pad(i.toString(), 3, '0', 1);
            if (i < (cnt - 1)) {
                s += '\n';
            }
        }

        var txt = this.add.text(leftX + 30, topY, s, {
            fontSize: '20pt'
        });
        txt.setMask(bg.createGeometryMask());

        this.scroller = this.plugins.get('rexScroller').add(bg, {
            bounds: [
                topY - txt.displayHeight + h,
                topY
            ],
            value: topY,
        }).on('valuechange', function (value) {
            txt.y = value;
        });

        this.scrollerState = this.add.text(0, 0, '');
    }

    update() {
        this.scrollerState.setText(this.scroller.state + "\n" + this.scroller.value);
    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Demo,
    backgroundColor: 0x111111,
    plugins: {
        global: [{
            key: 'rexScroller',
            plugin: ScrollerPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);