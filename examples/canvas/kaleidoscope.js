'use strict'

import Canvas from './../../plugins/canvas-plugin.js'

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
        this.bg;
        this.canvas;      // canvas object
        this.imageGroup;  // image group
        this.btnRun;      // draw to image objects
        this.isDone = false;
        this.hue = 0;
    }

    preload() { }

    create() {        
        this.bg = this.add.rexCanvas(300, 350, 600, 600)
            .fill('#050505');
        this.canvas = this.add.rexCanvas(300, 350, 600, 600)
            .generateTexture('canvas')
            .setInteractive();
        this.input.setDraggable(this.canvas);

        var imageNum = 12;
        this.imageGroup = this.add.group({
            classType: Phaser.GameObjects.Image,
            key: 'canvas',
            visible: false,
            repeat: imageNum - 1,
            setXY: {
                x: this.canvas.x,
                y: this.canvas.y
            },
            setRotation: {
                value: 0,
                step: Phaser.Math.PI2 / imageNum
            }
        });

        this.btnRun = this.add.text(30, 750, 'Drag above then press here', { fontSize: 22 })
            .setInteractive()
            .on('pointerdown', this.drawToImages, this);

    }

    update() {
        var canvasInput = this.canvas.input;
        if (canvasInput.dragState > 0) {
            this.drawCanvas(canvasInput.localX, canvasInput.localY);
        }
    }

    drawStart() {
        this.bg.visible = true;
        this.canvas.clear();
        this.canvas.generateTexture('canvas');
        this.imageGroup.toggleVisible();
    }

    drawCanvas(localX, localY) {
        if (this.isDone) {
            this.drawStart();
            this.isDone = false;
        }

        var canvas = this.canvas;
        var ctx = canvas.getCanvas().getContext('2d');
        var color = "hsl( " + this.hue + " , 50%, 50%)";
        drawCircle(ctx, localX, localY, 3, color);
        this.hue = (this.hue + 3) % 360;
    }

    drawToImages() {
        if (this.isDone) { return; }

        this.bg.visible = false;
        this.canvas.generateTexture('canvas');
        this.canvas.clear();
        this.imageGroup.toggleVisible();
        this.isDone = true;
    }

}

var drawCircle = function (ctx, x, y, r, color) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Phaser.Math.PI2, false);
    ctx.strokeStyle = color;
    ctx.stroke();
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 600,
    height: 800,
    scene: Demo
};

var game = new Phaser.Game(config);