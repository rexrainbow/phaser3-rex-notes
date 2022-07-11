import phaser from 'phaser/src/phaser.js';
import PerspectiveImagePlugin from '../../plugins/perspectiveimage-plugin.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('card-back', 'assets/images/card2-back.png');
    }

    create() {
        var card0 = CreateCard(this, 200, 300);
        var card1 = CreateCard(this, 400, 300);
        var card2 = CreateCard(this, 600, 300);
    }

    update() {
    }
}

var CreateCard = function (scene, x, y) {
    var frame = scene.textures.getFrame('card-back');
    var width = frame.cutWidth,
        height = frame.cutHeight;

    return scene.add.rexPerspectiveCard({
        x: x, y: y,
        front: CreateCardFrontFace(scene, width, height),
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

var CreateCardFrontFace = function (scene, width, heigh) {
    var card = CreateLabel(scene, width, heigh);
    var image = scene.add.rexPerspectiveRenderTexture()
        .snapshot(card.getAllVisibleChildren())

    card.destroy();

    return image;
}

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;
var CreateLabel = function (scene, width, heigh) {
    var content = 'Phaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. You can use JavaScript or TypeScript for development.';
    return scene.rexUI.add.label({
        width: width, height: heigh,
        orientation: 1,
        background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY).setStrokeStyle(2, COLOR_LIGHT),
        text: scene.add.text(0, 0, content, {
            wordWrap: { width: 300 - 20 - 20 }
        }),
        icon: scene.rexUI.add.roundRectangle(0, 0, 160, 160, 20, COLOR_DARK),
        space: { left: 20, right: 20, top: 20, bottom: 20, icon: 10, }
    }).layout();
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
    backgroundColor: 0x33333,
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexPerspectiveImage',
            plugin: PerspectiveImagePlugin,
            start: true
        }],
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }
};

var game = new Phaser.Game(config);