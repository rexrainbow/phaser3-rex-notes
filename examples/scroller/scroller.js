'use strict'

import ScrollerPlugin from 'rexPlugins/scroller-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

    }

    preload() {}

    create() {
        var container = this.add.container(400, 300)
            .setSize(300, 400);
        var topY = -container.height / 2,
            leftX = -container.width / 2;
        var bg = this.add.graphics()
            .fillStyle(0x333333, 1)
            .fillRect(container.x + leftX, container.y + topY, container.width, container.height)
            .setVisible(true)
            .setDepth(-1);
        container.setMask(bg.createGeometryMask());


        var s = '';
        for (var i = 0, cnt = 100; i < cnt; i++) {
            s += i + ': ' + getRandomChar(12);
            if (i < (cnt - 1)) {
                s += '\n';
            }
        }

        var txt = this.add.text(leftX, topY, s, {
            fontSize: '20pt'
        });
        container.add(txt);

        this.scroller = this.plugins.get('rexScroller').add(container, {
            bounds: [
                topY - txt.displayHeight + container.displayHeight,
                topY
            ],
            value: topY,
        }).on('valuechange', function (value) {
            console.log(value);
            txt.y = value;
        });

        this.scrollerState = this.add.text(0, 0, '');
    }

    update() {
        this.scrollerState.setText(this.scroller.state + "\n" + this.scroller.value);
    }
}

var s = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ ';
const GetRandom = Phaser.Utils.Array.GetRandom;
var getRandomChar = function (len) {
    var resutl = '';
    for (var i = 0; i < len; i++) {
        resutl += GetRandom(s);
    }
    return resutl;
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexScroller',
            plugin: ScrollerPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);