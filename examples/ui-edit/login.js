import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('user', './assets/images/person.png');
        this.load.image('password', './assets/images/key.png');
    }

    create() {
        var loginDialog = CreateLoginDialog(this, {
            x: 400,
            y: 300,
        })
            .drawBounds(this.add.graphics(), 0xff0000);
    }

    update() { }
}

const GetValue = Phaser.Utils.Objects.GetValue;
var CreateLoginDialog = function (scene, config) {
    var x = GetValue(config, 'x', 0);
    var y = GetValue(config, 'y', 0);
    var width = GetValue(config, 'width', undefined);
    var height = GetValue(config, 'height', undefined);

    var background = scene.rexUI.add.roundRectangle(0, 0, 10, 10, 10, COLOR_PRIMARY);
    var title = scene.add.text(0, 0, 'Login');
    var userName = scene.rexUI.add.label({
        orientation: 'x',
        icon: scene.add.image(0, 0, 'user'),
        text: scene.rexUI.add.BBCodeText(0, 0, 'abc', { fixedWidth: 150 }),
    })
        .setInteractive()
        .on('pointerdown', function () {
            scene.rexUI.edit(userName.getElement('text'));
        });

    var password = scene.rexUI.add.label({
        orientation: 'x',
        icon: scene.add.image(0, 0, 'password'),
        text: scene.rexUI.add.BBCodeText(0, 0, '***', { fixedWidth: 150 }),
    })
        .setInteractive()
        .on('pointerdown', function () {
            scene.rexUI.edit(password.getElement('text'));
        });
    var loginDialog = scene.rexUI.add.sizer({
        orientation: 'y',
        x: x,
        y: y,
        width: width,
        height: height,
    })
        .addBackground(background)
        .add(title, 0, 'center', 0, false)
        .add(userName, 0, 'left', 0, true)
        .add(password, 0, 'left', 0, true)
        .layout();
    return loginDialog;
};

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    dom: {
        createContainer: true
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