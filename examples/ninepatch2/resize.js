import phaser from 'phaser/src/phaser.js';
import NinePatchPlugin from '../../plugins/ninepatch2-plugin.js'

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        CreateTexture0(this, 'bg0');
        this.add.image(0, 0, 'bg0').setOrigin(0);
        var gameObject = this.add.rexNinePatch2({
            x: 200, y: 200,
            width: 250, height: 200,
            key: 'bg0',
            columns: [30, 30, 30],
            rows: [30, 30, 30],
            stretchMode: {
                edge: 'repeat',
                internal: 'scale'
            }
        })
            .setOrigin(0)

        AddDragCornerController(gameObject)
    }

    update() {
    }
}

var CreateTexture0 = function (scene, key) {
    // width: 30-30-30
    // height: 30-30-30
    var width = 90, height = 90;
    scene.add.graphics()
        .fillStyle(0xffffff)
        .fillRect(0, 0, 30, 30)
        //.fillRect(width - 30, 0, 30, 30)
        //.fillRect(0, height - 30, 30, 30)
        .fillRect(width - 30, height - 30, 30, 30)
        .fillStyle(0xff0000)
        .fillCircle(45, 15, 15)
        .fillCircle(15, 45, 15)
        .fillCircle(45, 75, 15)
        .fillCircle(75, 45, 15)
        .generateTexture(key, width, height)
        .destroy();
}

var AddDragCornerController = function (gameObject) {
    var scene = gameObject.scene;

    var topLeft = gameObject.getTopLeft();
    var topLeftController = scene.add.rectangle(topLeft.x, topLeft.y, 30, 30, 0x333333);
    var bottomRight = gameObject.getBottomRight();
    var bottomRighterController = scene.add.rectangle(bottomRight.x, bottomRight.y, 30, 30, 0x333333);

    bottomRighterController
        .setInteractive({ draggable: true })
        .on('drag', function (pointer, dragX, dragY) {
            var topX = topLeftController.x,
                topY = topLeftController.y;
            var width = dragX - topX,
                height = dragY - topY;

            gameObject.resize(width, height);

            bottomRighterController.x = dragX;
            bottomRighterController.y = dragY;
        })


    topLeftController
        .setInteractive({ draggable: true })
        .on('drag', function (pointer, dragX, dragY) {
            var dragDX = dragX - topLeftController.x;
            var dragDY = dragY - topLeftController.y;
            gameObject.x += dragDX;
            gameObject.y += dragDY;

            topLeftController.x += dragDX;
            topLeftController.y += dragDY;
            bottomRighterController.x += dragDX;
            bottomRighterController.y += dragDY;
        })

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
        global: [{
            key: 'rexNinePatch',
            plugin: NinePatchPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);