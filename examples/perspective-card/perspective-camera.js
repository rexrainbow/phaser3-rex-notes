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
        this.load.image('card', 'assets/images/card2.png');
        this.load.image('card-back', 'assets/images/card2-back.png');
    }

    create() {
        var card0 = CreateCard(this, 200, 300);
        var card1 = CreateCard(this, 400, 300);
        var card2 = CreateCard(this, 600, 300);

        this.scene.setVisible(false);
        this.scene.launch('Render');
    }

    update() {
    }
}

var CreateCard = function (scene, x, y) {
    return scene.add.rexPerspectiveCard({
        x: x, y: y,
        front: { key: 'card' },
        back: { key: 'card-back' },
        face: 'back',

        flip: {
            frontToBack: 'right',
            backToFront: 'left',
            duration: 1000,
            ease: 'Cubic'
        }
    })
        .setScale(0.5)
        .setInteractive()
        .on('pointerdown', function (pointer, localX, localY) {
            if (localX <= (this.width / 2)) {
                this.flip.flipLeft();
            } else {
                this.flip.flipRight();
            }
            // this.flip.flip();
        })
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
        image.angleX = -45;

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
    scene: [GameScene, RenderScene],
    backgroundColor: 0x33333,
    plugins: {
        global: [{
            key: 'rexPerspectiveImage',
            plugin: PerspectiveImagePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);