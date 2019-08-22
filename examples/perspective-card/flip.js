import PerspectiveCardPlugin from '../../plugins/perspectivecard-plugin.js';
import CreateRectangleTexture from '../../plugins/utils/texture/CreateRectangleTexture.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        CreateRectangleTexture(this, 'rect', 200);
        var card = this.add.rexPerspectiveCard(400, 300, 'rect');
        card.topLeftColor = 0x800000;
        card.topRightColor = 0x008000;
        card.bottomLeftColor = 0x000080;
        var tween = this.tweens.add({
            targets: card,
            angleY: { from: 0, to: Phaser.Math.DegToRad(180) },
            ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 2000,
            repeat: 0,            // -1: infinity
            yoyo: false
        });
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
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexPerspectiveCard',
            plugin: PerspectiveCardPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);