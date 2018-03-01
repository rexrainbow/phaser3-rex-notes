'use strict'

import DragCursorPlugin from './../../plugins/dragcursor-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'demo'
        })

        this.dragCursor;
        this.cursorKeys;
        this.text;
        this.graphics;
    }

    preload() {}

    create() {
        this.dragCursor = new DragCursorPlugin(this, {
            dir: '8dir',     // 0|'up&down'|1|'left&right|2|'4dir'|3|'8dir'
            distanceMin: 30,
            //origin:{       // assign origin point to (400,300)
            //    x:400,
            //    y:300
            //}
        });
        //this.dragCursor.setOrigin(400, 300);

        this.cursorKeys = this.dragCursor.createCursorKeys();
        this.text = this.add.text(100, 100, '--');
        this.graphics = this.add.graphics();
    }

    update() {
        var keyDownList = [];
        for (var keyName in this.cursorKeys) {
            if (this.cursorKeys[keyName].isDown) {
                keyDownList.push(keyName);
            }
        }

        var s;
        if (keyDownList.length === 0) {
            s = '--';
        } else {
            s = keyDownList.join(",");
        }
        this.text.setText(s);

        this.graphics.clear();        
        if (this.dragCursor.start.x != null) {
            this.graphics.lineStyle(3, 0xffffff, 1);
            this.graphics.lineBetween(
                this.dragCursor.start.x,
                this.dragCursor.start.y,
                this.dragCursor.end.x,
                this.dragCursor.end.y
            );
        }
    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Demo
};

var game = new Phaser.Game(config);