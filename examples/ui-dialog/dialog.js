import UIPlugin from '../../templates/ui/ui-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

    }

    preload() { }

    create() {
        var dialog = this.rexUI.add.dialog({
            x: 400,
            y: 300,
            width: 500,

            background: this.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x1565c0),

            title: createLabel(this, 'Title').setDraggable(),

            toolbar: [
                createLabel(this, 'O'),
                createLabel(this, 'X')
            ],

            content: createLabel(this, 'Content'),

            description: createLabel(this, 'Description'),

            choices: [
                createLabel(this, 'Choice0'),
                createLabel(this, 'Choice1'),
                createLabel(this, 'Choice2')
            ],

            actions: [
                createLabel(this, 'Action0'),
                createLabel(this, 'Action1')
            ],

            space: {
                left: 20,
                right: 20,
                top: -20,
                bottom: -20,

                title: 25,
                // titleLeft: 30,
                content: 25,
                description: 25,
                // descriptionLeft: 20,
                // descriptionRight: 20,
                choices: 25,

                // toolbarItem: 5,
                choice: 15,
                action: 15,
            },

            expand: {
                title: false,
                // content: false,
                // description: false,
                // choices: false,
                // actions: false,
            },

            align: {
                // title: 'center',
                // content: 'right',
                // description: 'left',
                // choices: 'left',
                actions: 'left', // 'center'|'left'|'right'
            },

            click: {
                mode: 'release'
            }
        })
            .setDraggable('background')   // Draggable-background
            .layout()
            // .drawBounds(this.add.graphics(), 0xff0000)
            .popUp(1000);

        this.print = this.add.text(0, 0, '');
        dialog
            .on('button.click', function (button, groupName, index, pointer, event) {
                this.print.text += groupName + '-' + index + ': ' + button.text + '\n';
            }, this)
            .on('button.over', function (button, groupName, index, pointer, event) {
                button.getElement('background').setStrokeStyle(1, 0xffffff);
            })
            .on('button.out', function (button, groupName, index, pointer, event) {
                button.getElement('background').setStrokeStyle();
            });
    }

    update() { }
}

var createLabel = function (scene, text) {
    return scene.rexUI.add.label({
        width: 40, // Minimum width of round-rectangle
        height: 40, // Minimum height of round-rectangle

        background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, 0x5e92f3),

        text: scene.add.text(0, 0, text, {
            fontSize: '24px'
        }),

        space: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10
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
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }
};

var game = new Phaser.Game(config);