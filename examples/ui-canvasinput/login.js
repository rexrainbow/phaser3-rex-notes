import phaser from 'phaser/src/phaser.js';
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
        var print = this.add.text(0, 0, '');

        var loginDialog = CreateLoginDialog(this, {
            x: 400,
            y: 300,
            title: 'Welcome',
            username: 'abc',
            password: '123',
        })
            .on('login', function (username, password) {
                print.text += `${username}:${password}\n`;
            })
            //.drawBounds(this.add.graphics(), 0xff0000);
            .popUp(500);
    }

    update() { }
}

const GetValue = Phaser.Utils.Objects.GetValue;
var CreateLoginDialog = function (scene, config) {
    var username = GetValue(config, 'username', '');
    var password = GetValue(config, 'password', '');
    var title = GetValue(config, 'title', 'Welcome');
    var x = GetValue(config, 'x', 0);
    var y = GetValue(config, 'y', 0);
    var width = GetValue(config, 'width', undefined);
    var height = GetValue(config, 'height', undefined);

    // Background object
    var background = scene.rexUI.add.roundRectangle(0, 0, 10, 10, 10, COLOR_PRIMARY);

    // Title field object
    var titleField = scene.add.text(0, 0, title, { fontSize: 20 });

    // User name field object
    var userNameField = scene.rexUI.add.label({
        orientation: 'x',
        background: scene.rexUI.add.roundRectangle(0, 0, 10, 10, 10).setStrokeStyle(2, COLOR_LIGHT),
        icon: scene.add.image(0, 0, 'user'),

        text: scene.rexUI.add.canvasInput({
            width: 150, height: 36,
            style: {
                fontSize: 20,
                backgroundBottomY: 5,
                backgroundHeight: 20,

                // Solution A
                'cursor.color': 'black',
                'cursor.backgroundColor': 'white',
            },
            wrap: {
                vAlign: 'center'
            },
            text: username,
        }),

        space: { top: 5, bottom: 5, left: 5, right: 5, icon: 10, }
    })

    // Password field object
    var passwordField = scene.rexUI.add.label({
        orientation: 'x',
        background: scene.rexUI.add.roundRectangle(0, 0, 10, 10, 10).setStrokeStyle(2, COLOR_LIGHT),
        icon: scene.add.image(0, 0, 'password'),

        text: scene.rexUI.add.canvasInput({
            width: 150, height: 36,
            style: {
                fontSize: 20,
                backgroundBottomY: 5,
                backgroundHeight: 20,

                // Solution A
                'cursor.color': 'black',
                'cursor.backgroundColor': 'white',
            },
            wrap: {
                vAlign: 'center'
            },
            text: markPassword(password),

            onOpen(textObject, hiddenInputText) {
                // Can't use passwordField.text because it is masked by dot
                hiddenInputText.setText(password);
            },

            onUpdate(text, textObject, hiddenInputText) {
                // Save password from input of hiddenEdit
                password = text;

                // Return masked string for textObject displaying
                return markPassword(text);
            }
        }),

        space: { top: 5, bottom: 5, left: 5, right: 5, icon: 10, }
    })

    // Login button object
    var loginButton = scene.rexUI.add.label({
        orientation: 'x',
        background: scene.rexUI.add.roundRectangle(0, 0, 10, 10, 10, COLOR_LIGHT),
        text: scene.add.text(0, 0, 'Login', { fontSize: 20 }),
        space: { top: 8, bottom: 8, left: 8, right: 8 }
    })
        .setInteractive()
        .on('pointerdown', function () {
            username = userNameField.text;
            loginDialog.emit('login', username, password);
        });

    // Dialog and its children
    var loginDialog = scene.rexUI.add.sizer({
        orientation: 'y',
        x: x,
        y: y,
        width: width,
        height: height,
    })
        .addBackground(background)
        .add(titleField, 0, 'center', { top: 10, bottom: 10, left: 10, right: 10 }, false)
        .add(userNameField, 0, 'left', { bottom: 10, left: 10, right: 10 }, true)
        .add(passwordField, 0, 'left', { bottom: 10, left: 10, right: 10 }, true)
        .add(loginButton, 0, 'center', { bottom: 10, left: 10, right: 10 }, false)
        .layout();

    return loginDialog;
};
var markPassword = function (password) {
    return new Array(password.length + 1).join('•');
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