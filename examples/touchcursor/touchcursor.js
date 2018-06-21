'use strict'

import TouchCursorPlugin from 'rexPlugins/touchcursor-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        this.bg = this.add.graphics()
            .setPosition(400, 300)
            .lineStyle(3, 0x0000ff)
            .strokeCircle(0, 0, 100);
        this.touchCursor = this.plugins.get('rexTouchCursor').add(this.bg, {
            radius: 100,
            dir: '8dir', // 0|'up&down'|1|'left&right|2|'4dir'|3|'8dir'
            distanceMin: 30
        });
        //this.cursorKeys = this.touchCursor.createCursorKeys();
        this.thumb = this.add.graphics()
            .setPosition(400, 300)
            .lineStyle(3, 0xff0000)
            .strokeCircle(0, 0, 40);

        this.text = this.add.text(100, 100, '--');
        this.dragLine = this.add.graphics();
    }

    update() {
        var touchCursor = this.touchCursor;

        var s = 'Key down: ';
        if (touchCursor.anyKeyDown) {
            s += (touchCursor.upKeyDown) ? 'up ' : '';
            s += (touchCursor.downKeyDown) ? 'down ' : '';
            s += (touchCursor.leftKeyDown) ? 'left ' : '';
            s += (touchCursor.rightKeyDown) ? 'right ' : '';
        } else {
            s += '--';
        }
        s += '\n';
        s += ('Force: ' + Math.floor(touchCursor.force * 100) / 100 + '\n');
        s += ('Angle: ' + Math.floor(touchCursor.angle * 100) / 100 + '\n');
        this.text.setText(s);

        this.dragLine.clear();
        if (touchCursor.anyKeyDown) {
            this.dragLine.lineStyle(3, 0x00ff00, 1);
            this.dragLine.lineBetween(
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