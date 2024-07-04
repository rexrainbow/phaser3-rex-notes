import phaser from 'phaser/src/phaser.js';
import NameInputDialog from '../../templates/ui/nameinputdialog/NameInputDialog.js';

const COLOR_MAIN = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var dialog = new NameInputDialog(this, {
            x: 400, y: 300,
            width: 400,
            space: {
                left: 10, right: 10, top: 10, bottom: 10,
                item: 20,
                names: 20,
            },

            background: { strokeColor: COLOR_LIGHT, strokeWidth: 4, radius: 10, },

            title: {
                text: { fontSize: 24 }
            },

            nameTitle: {
                text: { fontSize: 20 }
            },

            nameInput: {
                background: {
                    color: COLOR_DARK
                },
                focusStyle: {
                    color: COLOR_MAIN,
                },
                style: {
                    backgroundBottomY: 4,
                    backgroundHeight: 18,
                },
                cursorStyle: {
                    color: 'black',
                    backgroundColor: 'white',
                }
            },

            action: {
                space: { left: 5, right: 5, top: 5, bottom: 5 },
                background: { color: COLOR_DARK, radius: 5 },
                text: { fontSize: 20 },
            }
        })

        this.add.existing(dialog);

        dialog
            .resetDisplayContent({
                title: 'My name is',
                firstName: 'BBB',
                lastName: 'AAA',
                action: 'OK'
            })
            .layout();
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
    scene: Demo
};

var game = new Phaser.Game(config);