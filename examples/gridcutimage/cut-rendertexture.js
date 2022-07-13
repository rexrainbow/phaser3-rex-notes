import phaser from 'phaser/src/phaser.js';
import GridCutImagePlugin from '../../plugins/gridcutimage-plugin';

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

var CreateBall = function (scene, color) {
    var ball = scene.add.circle(400, 300, 10, color);
    scene.physics.add.existing(ball, 0);

    var body = ball.body;
    body.velocity.setToPolar(
        Phaser.Math.DegToRad(Math.random() * 360),
        400
    )
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

        var images = this.plugins.get('rexGridCutImage').gridCut(rt, 4, 4);
        for (var i = 0, cnt = images.length; i < cnt; i++) {
            images[i]
                .setInteractive({ draggable: true })
                .on('drag', function (pointer, dragX, dragY) {
                    this.setPosition(dragX, dragY);
                });
        }
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
            key: 'rexGridCutImage',
            plugin: GridCutImagePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);