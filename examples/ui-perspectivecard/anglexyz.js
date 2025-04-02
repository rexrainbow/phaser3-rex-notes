import phaser from '../../../phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';
import Dat from '../../plugins/utils/dat.gui/dat.gui.min.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var card0 = CreateCard(this, 0);
        var card1 = CreateCard(this, 1);
        this.rexUI.add.sizer({
            x: 400, y: 300,

            orientation: 'x',
            space: { item: 40 }
        })
            .add(card0)
            .add(card1)
            .layout();

        var gui = new Dat.GUI();
        var card0Ctrl = gui.addFolder('Card0');
        card0Ctrl.add(card0, 'angleX', -180, 180);
        card0Ctrl.add(card0, 'angleY', -180, 180);
        card0Ctrl.add(card0, 'angleZ', -180, 180);
        card0Ctrl.add(card0, 'scale', 0, 2);
        var card1Ctrl = gui.addFolder('Card1');
        card1Ctrl.add(card1, 'angleX', -180, 180);
        card1Ctrl.add(card1, 'angleY', -180, 180);
        card1Ctrl.add(card1, 'angleZ', -180, 180);
        card1Ctrl.add(card1, 'scale', 0, 2);

    }

    update() {
    }
}

var CreateCard = function (scene, orientation) {
    return scene.rexUI.add.perspectiveCard({
        front: CreateFrontFace(scene),
        back: CreateBackFace(scene),
        orientation: orientation,
        snapshotPadding: 3,

        flip: false
    })
}

const COLOR_MAIN = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;
var CreateFrontFace = function (scene) {
    var content = 'Phaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. You can use JavaScript or TypeScript for development.';
    return scene.rexUI.add.label({
        orientation: 1,
        background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_MAIN).setStrokeStyle(2, COLOR_LIGHT),
        text: scene.add.text(0, 0, content, {
            wordWrap: { width: 300 - 20 - 20 }
        }),
        icon: scene.rexUI.add.roundRectangle(0, 0, 160, 160, 20, COLOR_DARK),
        space: { left: 20, right: 20, top: 20, bottom: 20, icon: 10, }
    });
}
var CreateBackFace = function (scene) {
    return scene.rexUI.add.label({
        orientation: 1,
        background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_MAIN).setStrokeStyle(2, COLOR_LIGHT),
        icon: scene.rexUI.add.roundRectangle(0, 0, 240, 240, 20, COLOR_DARK),
        space: { left: 20, right: 20, top: 20, bottom: 20, icon: 10, }
    });
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