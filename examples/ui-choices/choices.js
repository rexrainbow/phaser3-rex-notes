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
    }

    async create() {
        var choices = CreateChoices(this)

        var result = await choices.clickChoicePromise({
            title: 'Question 1',
            content: '1 + 1 + 1 + 1 + 1',
            choices: ['4', '5', '6']
        })
        console.log(result.button.text);

        var result = await choices.clickChoicePromise({
            title: 'Question 2',
            content: '1 + 1 + 1 + 1',
            choices: ['4', '5']
        })
        console.log(result.button.text);
    }

    update() { }
}

var CreateChoices = function (scene) {
    return scene.rexUI.add.choices({
        x: 400, y: 300,
        width: 500,

        background: scene.rexUI.add.roundRectangle(0, 0, 100, 100, 20, COLOR_PRIMARY),

        title: CreateLabel(scene, ''),

        content: CreateLabel(scene, ''),

        description: CreateLabel(scene, ''),

        // Allows 4 choices
        choices: [
            CreateLabel(scene, '', COLOR_DARK),
            CreateLabel(scene, '', COLOR_DARK),
            CreateLabel(scene, '', COLOR_DARK),
            CreateLabel(scene, '', COLOR_DARK),
        ],

        space: {
            left: 20, right: 20, top: 20, bottom: 20,

            title: 25,
            content: 25,
            description: 25,
            choices: 25,

            choice: 15,
        },

        expand: {
            // title: false,
            // content: false,
            // description: false,
            // choices: false,
            // actions: true,
        },

        align: {
            title: 'center',
            // content: 'right',
            // description: 'left',
            // choices: 'left',
            actions: 'right', // 'center'|'left'|'right'
        },

        click: {
            mode: 'release'
        }
    })
        .on('button.over', function (button, groupName, index, pointer, event) {
            button.getElement('background').setStrokeStyle(1, 0xffffff);
        })
        .on('button.out', function (button, groupName, index, pointer, event) {
            button.getElement('background').setStrokeStyle();
        })
}

var CreateLabel = function (scene, text, backgroundColor) {
    return scene.rexUI.add.label({
        width: 40, // Minimum width of round-rectangle
        height: 40, // Minimum height of round-rectangle

        background: (backgroundColor !== undefined) ?
            scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, backgroundColor) :
            undefined,

        text: scene.add.text(0, 0, text, {
            fontSize: '24px'
        }),

        space: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10
        }
    })

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
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }
};

var game = new Phaser.Game(config);