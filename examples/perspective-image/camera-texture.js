import phaser from 'phaser/src/phaser.js';
import PerspectiveImagePlugin from '../../plugins/perspectiveimage-plugin.js';
import Dat from '../../plugins/utils/dat.gui/dat.gui.min.js';

class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'Game'
        })
    }

    preload() {
        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
    }

    create() {
        this.add.image(0, 0, 'classroom').setOrigin(0).setAlpha(0.7);

        for (var i = 0; i < 10; i++) {
            CreateBall(this, Phaser.Math.Between(0, 0xffffff))
        }

        this.scene.setVisible(false);
        this.scene.launch('Render');
    }

    update() {

    }
}

var RandomXY = Phaser.Math.RandomXY;
var CreateBall = function (scene, color) {
    var ball = scene.add.circle(400, 300, 10, color);
    scene.physics.add.existing(ball, 0);

    var body = ball.body;
    RandomXY(body.velocity, 400);
    body.setBounce(1).setCollideWorldBounds();
    return ball
}

class RenderScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'Render'
        })
    }

    preload() {
    }

    create() {
        var rt = this.make.renderTexture({ x: 0, y: 0, width: 800, height: 600 }, false)
        rt.saveTexture('game')
        this.events.on('postupdate', function () {
            rt.clear().draw(this.scene.get('Game').children, 0, 0);
        }, this);

        var image = this.add.rexPerspectiveImage(400, 300, 'game', undefined, { hideCCW: false });

        var gui = new Dat.GUI();
        gui.add(image, 'angleX', -180, 180);
        gui.add(image, 'angleY', -180, 180);
        gui.add(image, 'angleZ', -180, 180);
    }

    update() {

    }
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
    physics: {
        default: 'arcade',
        arcade: {

        }
    },
    scene: [GameScene, RenderScene],
    plugins: {
        global: [{
            key: 'rexPerspectiveImage',
            plugin: PerspectiveImagePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);