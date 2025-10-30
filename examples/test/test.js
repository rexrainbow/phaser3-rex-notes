import phaser from '../../../phaser/src/phaser.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var x = 0, y = 0;

         var rectangle = this.add.rectangle(x, y - 50, 100, 100).setStrokeStyle(3, 0x555555)

        var maskGameObject = this.add.graphics()
            .fillStyle(0xffffff)
            .fillRectShape(new Phaser.Geom.Rectangle(x - (200 / 2), y - (100 / 2), 200, 100))
            .setVisible(false);

       
        rectangle.enableFilters()
            .filters.external.addMask(maskGameObject);

        var container = this.add.container(400, 300, [maskGameObject, rectangle]);

    }

    update() { }
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
    scene: Demo
};

var game = new Phaser.Game(config);