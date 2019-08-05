import Outline from '../../plugins/gameobjects/outline/Outline.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
        this.mushrooms;
    }

    preload() {
        this.load.image('mushroom', 'assets/images/mushroom.png');
    }

    create() {
        var img = this.add.image(400, 300, 'mushroom');
        var rt = this.make.renderTexture({
            x: 0, y: 0,
            width: 1024, height: 1024
        }).draw(img);
        // It maybe non-power-of-2 and have incompatible texture filtering
        var outLine = new Outline(rt);
        //this.add.existing(outLine);
    }

    update(time) { }
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
    plugins: {
        //global: [{
        //    key: 'rexCanvasData',
        //    plugin: CanvasDataPlugin,
        //    start: true
        //}]
    }
};

var game = new Phaser.Game(config);