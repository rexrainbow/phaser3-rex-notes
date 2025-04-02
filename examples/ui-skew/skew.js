import phaser from '../../../phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_MAIN = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var card = CreateCard(this).setPosition(400, 300);
        var skew = this.rexUI.add.skew(card, { useParentBounds: true });

        skew.enter();  // Snapshot before tween
        this.tweens.add({
            targets: skew,
            skewXDeg: { start: 0, to: -30 },
            skewYDeg: { start: 0, to: -10 },
            ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 500,
            repeat: 0,            // -1: infinity
            yoyo: true,

            onStart: function () {
                // skew.enter();
            },
            onComplete: function () {
                skew.exit();
            }
        });

    }

    update() {
    }
}

var CreateCard = function (scene) {
    var content = 'Phaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. You can use JavaScript or TypeScript for development.';
    return scene.rexUI.add.label({
        width: 300, height: 400,
        orientation: 1,
        background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_MAIN).setStrokeStyle(2, COLOR_LIGHT),
        text: scene.add.text(0, 0, content, {
            wordWrap: { width: 300 - 20 - 20 }
        }),
        icon: scene.rexUI.add.roundRectangle(0, 0, 160, 160, 20, COLOR_DARK),
        space: {
            left: 20,
            right: 20,
            top: 20,
            bottom: 20,
            icon: 10,
        }
    }).layout();
}

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo,
    plugins: {
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }
};

var game = new Phaser.Game(config);