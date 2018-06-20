'use strict'

import TouchCursorPlugin from 'rexPlugins/touchcursor-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('dot', 'assets/images/white-dot.png');
    }

    create() {
        this.bg = this.add.image(200, 400, 'dot')
            .setDisplaySize(400, 400)
            .setTint(0x555555);
        this.touchCursor = this.plugins.get('rexTouchCursor').add(this.bg, {
            dir: '8dir', // 0|'up&down'|1|'left&right|2|'4dir'|3|'8dir'
            distanceMin: 30
        });
        //this.cursorKeys = this.touchCursor.createCursorKeys();
        this.thumb = this.add.image(400, 300, 'dot')
            .setDisplaySize(40, 40)
            .setTint(0xff0000);

        this.text = this.add.text(100, 100, '--');
        this.graphics = this.add.graphics();
    }

    update() {
        var touchCursor = this.touchCursor;

        var s = ''
        if (touchCursor.anyKeyDown) {
            s += (touchCursor.upKeyDown) ? 'up ' : '';
            s += (touchCursor.downKeyDown) ? 'down ' : '';
            s += (touchCursor.leftKeyDown) ? 'left ' : '';
            s += (touchCursor.rightKeyDown) ? 'right ' : '';
        } else {
            s = '--';
        }
        this.text.setText(s);

        this.graphics.clear();
        if (touchCursor.anyKeyDown) {
            this.graphics.lineStyle(3, 0x00ff00, 1);
            this.graphics.lineBetween(
                touchCursor.start.x,
                touchCursor.start.y,
                touchCursor.end.x,
                touchCursor.end.y
            );
            this.thumb.x = touchCursor.end.x;
            this.thumb.y = touchCursor.end.y;
        } else {
            this.thumb.x = this.bg.x;
            this.thumb.y = this.bg.y;
        }
    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexTouchCursor',
            plugin: TouchCursorPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);