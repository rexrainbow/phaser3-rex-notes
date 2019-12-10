import FirebasePlugin from '../../plugins/firebase-plugin.js';
import firebaseConfig from './firebaseConfig.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';
import GetRandomWord from '../../plugins/utils/string/GetRandomWord.js';


class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        // var rexFire = this.plugins.get('rexFire').initializeApp(firebaseConfig);
        var mainPanel = CreateMainPanel(this, {
            x: 400, y: 300,
            width: 640, height: 560,
            color: {
                background: 0x0E376F,
                track: 0x3A6BA5,
                thumb: 0xBFCDBB,
                inputBackground: 0x685784,
                inputBox: 0x182456
            },
            name: GetRandomWord(5, 10)
        })
            .layout()

    }

    update() { }
}

var CreateMainPanel = function (scene, config) {
    var background = scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, config.color.background);
    var messageBox = CreateMessageBox(scene, config);
    var inputPanel = CreateInputPanel(scene, config);

    var mainPanel = scene.rexUI.add.sizer({
        x: config.x, y: config.y,
        width: config.width, height: config.height,
        orientation: 'y'
    })
        .addBackground(background)
        .add(
            messageBox, //child
            1, // proportion
            'center', // align
            { top: 10, bottom: 20, left: 5, right: 5 }, // paddingConfig
            true, // expand
        )
        .add(
            inputPanel, //child
            0, // proportion
            'center', // align
            0, // paddingConfig
            true, // expand
        );

    return mainPanel;
};

var CreateMessageBox = function (scene, config) {
    return scene.rexUI.add.textArea({
        text: scene.rexUI.add.BBCodeText(0, 0, '', {

        }),

        slider: {
            track: scene.rexUI.add.roundRectangle(0, 0, 20, 10, 10, config.color.track),
            thumb: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, config.color.thumb),
        }
    })
};

var CreateInputPanel = function (scene, config) {
    var background = scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, config.color.inputBackground); // Height is 40
    var nameBox = scene.rexUI.add.BBCodeText(0, 0, config.name, {
        halign: 'right',
        valign: 'center',
        fixedWidth: 100,
        fixedHeight: 40
    });

    var inputBox = scene.rexUI.add.BBCodeText(0, 0, '', {
        valign: 'center',
        fixedWidth: 100,
        fixedHeight: 40,
        backgroundColor: `#${config.color.inputBox.toString(16)}`
    });
    var SendBtn = scene.rexUI.add.BBCodeText(0, 0, 'Send', {

    });

    return scene.rexUI.add.label({
        background: background,
        icon: nameBox,
        text: inputBox,
        expandTextWidth: true,
        action: SendBtn,

        space: {
            left: 15,
            right: 15,
            top: 0,
            bottom: 0,

            icon: 10,
            text: 10,
        }
    });
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
            key: 'rexFire',
            plugin: FirebasePlugin,
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