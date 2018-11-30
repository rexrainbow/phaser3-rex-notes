import UIPlugin from '../../templates/ui/ui-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

    }

    preload() {}

    create() {
        var dialog = this.rexUI.add.dialog({
                x: 400,
                y: 300,

                background: this.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x1565c0),

                title: createLabel(this, 'Title'),

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

                actionsAlign: 'left', // 'center'|'left'|'right'

                space: {
                    title: 25,
                    content: 25,
                    description: 25,
                    choices: 25,
                    choice: 15,
                    action: 15,

                    left: 20,
                    right: 20,
                    top: 20,
                    bottom: 20,
                }
            })
            .layout()
            // .drawBounds(this.add.graphics(), 0xff0000)
            .popUp(1000);

        this.print = this.add.text(0, 0, '');
        dialog
            .on('button.click', function (button, groupName, index) {
                this.print.text += groupName + '-' + index + ': ' + button.text + '\n';
            }, this)
            .on('button.over', function (button, groupName, index) {
                button.getElement('background').setStrokeStyle(1, 0xffffff);
            })
            .on('button.out', function (button, groupName, index) {
                button.getElement('background').setStrokeStyle();
            });
    }

    update() {}
}

var createLabel = function (scene, text) {
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0x5e92f3),

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