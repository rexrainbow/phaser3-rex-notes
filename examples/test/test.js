'use strict'

var preload = function () {};

var create = function () {
    var shape = new Phaser.Geom.Rectangle(-200, -200, 400, 400);
    debugger
    var container = this.add.container(200, 200);

    // draw bound
    this.add.graphics()
        .lineStyle(3, 0xff0000)
        .strokeRect(0, 0, 400, 400);

    var btn0 = this.add.text(-100, -100, 'Btn0', {
        fontSize: '30px',
        backgroundColor: 0xcccccc
    })
    container.add(btn0);

    var btn1 = this.add.text(300, 300, 'Btn1', {
        fontSize: '30px',
        backgroundColor: 0xcccccc
    })
    container.add(btn1);

    container.setInteractive(
            shape,
            Phaser.Geom.Rectangle.Contains)
        .on('pointerup', function (pointer, localX, localY) {
            console.log('click container ' + pointer.x + ' ,' + pointer.y);
        });

    btn0.setInteractive()
        .on('pointerup', function (pointer, localX, localY) {
            console.log('click btn0 ' + pointer.x + ' ,' + pointer.y);
        });

    btn1.setInteractive()
        .on('pointerup', function (pointer, localX, localY) {
            console.log('click btn1 ' + pointer.x + ' ,' + pointer.y);
        });
    //container.depth = 1000;
};

var sceneConfig = {
    preload: preload,
    create: create
};
var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: sceneConfig
};
var game = new Phaser.Game(config);