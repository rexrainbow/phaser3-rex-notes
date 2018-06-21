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
        this.joyStick = new VirtualJoyStick(this, {
            x: 400,
            y: 300,
            radius: 100,
            debug: true
        });

        this.text = this.add.text(0, 0);
    }

    update() {
        var touchCursor = this.joyStick.touchCursor;
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
    }
}

// VirtualJoyStick
const GetValue = Phaser.Utils.Objects.GetValue;
class VirtualJoyStick {
    constructor(scene, config) {
        this.scene = scene;
        this.x = GetValue(config, 'x', 0);
        this.y = GetValue(config, 'y', 0);
        this.radius = GetValue(config, 'radius', 100);
        this.debug = GetValue(config, 'debug', false);

        this.bg = this.createBackground(config);
        this.thumb = this.createThumb(config);
        this.touchCursor = this.createTouchCursor(this.bg, config);
        this.dragLine = this.createDragLine(config);

        this.boot();        
    }

    createBackground(config) {
        var color = GetValue(config, 'background.color', 0x0000ff);
        var thinkness = GetValue(config, 'background.thinkness', 3);

        var bg = this.scene.add.graphics()
            .setPosition(this.x, this.y)
            .lineStyle(thinkness, color)
            .strokeCircle(0, 0, this.radius);
        return bg;
    }

    createThumb(config) {
        var color = GetValue(config, 'thumb.color', 0xff0000);
        var radius = GetValue(config, 'thumb.radius', 40);
        var thinkness = GetValue(config, 'thumb.thinkness', 3);

        var thumb = this.scene.add.graphics()
            .setPosition(this.x, this.y)
            .lineStyle(thinkness, color)
            .strokeCircle(0, 0, radius);
        return thumb;
    }

    createDragLine(config) {
        var dragLine;
        if (this.debug) {
            this.dragLineColor = GetValue(config, 'dragLine.color', 0x00ff00);
            this.dragLineThinkness = GetValue(config, 'dragLine.thinkness', 1);
            var dragLine = this.scene.add.graphics();
        }
        return dragLine;
    }

    createTouchCursor(gameObject, config) {
        var cursorConfig = GetValue(config, 'cursor', undefined);
        if (cursorConfig === undefined) {
            cursorConfig = {
                radius: this.radius
            }
        }

        var touchCursor = this.scene.plugins.get('rexTouchCursor').add(gameObject, cursorConfig);
        return touchCursor;
    }

    boot() {
        var ee = this.scene.sys.events;
        ee.on('preupdate', this.update, this); 
    }

    destroy() {
        this.bg.destroy();
        this.thumb.destroy();
        this.touchCursor.destroy();

        if (this.dragLine) {
            this.dragLine.destroy();
        }
    }

    update() {
        this.updateDragLine();
        this.updateThumb();
    }

    updateThumb() {
        var touchCursor = this.touchCursor;
        if (touchCursor.anyKeyDown) {
            if (touchCursor.force > this.radius) {
                var rad = touchCursor.rotation;
                this.thumb.x = touchCursor.start.x + (Math.cos(rad) * this.radius);
                this.thumb.y = touchCursor.start.y + (Math.sin(rad) * this.radius);
            } else {
                this.thumb.x = touchCursor.end.x;
                this.thumb.y = touchCursor.end.y;
            }
        } else {
            this.thumb.x = this.bg.x;
            this.thumb.y = this.bg.y;
        }
    }

    updateDragLine() {
        if (!this.debug) {
            return;
        }
        var touchCursor = this.touchCursor;
        this.dragLine.clear();
        if (touchCursor.anyKeyDown) {
            this.dragLine.lineStyle(this.dragLineThinkness, this.dragLineColor);
            this.dragLine.lineBetween(
                touchCursor.start.x,
                touchCursor.start.y,
                touchCursor.end.x,
                touchCursor.end.y
            );
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