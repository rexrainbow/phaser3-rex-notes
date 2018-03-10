'use strict'

import Canvas from './../../plugins/canvas-plugin.js'

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'demo'
        })

        this.canvas;      // canvas object
        this.imageGroup;  // image group
        this.btnRun;      // draw to image objects
        this.isDone = false;
    }

    preload() { }

    create() {
        debugger
        this.canvas = this.add.rexCanvas(300, 300, 600, 600)
            .setData('hue', 0)
            .generateTexture('canvas')
            .setInteractive();
        this.input.setDraggable(this.canvas);

        var imageNum = 12;
        this.imageGroup = this.add.group();
        this.imageGroup.createFromConfig({
            classType: Phaser.GameObjects.Image,
            key: 'canvas',
            visible: false,
            repeat: imageNum - 1,
            setXY: {
                x: 300,
                y: 300
            },
            setRotation: {
                value: 0,
                step: Phaser.Math.PI2 / imageNum
            }
        });

        this.btnRun = this.add.text(30, 700, 'Drag above then press here', { fontSize: 22 })
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
        this.canvas.clear();
        this.canvas.generateTexture('canvas');
        Phaser.Actions.SetVisible(this.imageGroup.getChildren(), false);
    }

    drawCanvas(localX, localY) {
        if (this.isDone) {
            this.drawStart();
            this.isDone = false;
        }

        var canvas = this.canvas;
        var ctx = canvas.getCanvas().getContext('2d');
        var hue = canvas.getData('hue');
        var color = "hsl( " + hue + " , 50%, 50%)";
        drawCircle(ctx, localX, localY, 3, color);
        canvas.setData('hue', (hue + 3) % 360);
    }

    drawToImages() {
        if (this.isDone) { return; }

        this.canvas.generateTexture('canvas');
        this.canvas.clear();
        Phaser.Actions.SetVisible(this.imageGroup.getChildren(), true);
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
document.body.style.backgroundColor = "black";