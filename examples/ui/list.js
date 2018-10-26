import UIPlugin from 'rexTemplates/ui/ui-plugin.js';

const Random = Phaser.Math.Between;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

    }

    preload() {}

    create() {
        this.rexUI.add.list({
                x: 400,
                y: 300,

                title: this.add.text(0, 0, 'Title', {
                    fontSize: '36px'
                }),

                items: [
                    getItem(this, Random(0, 0xffffff), 'Hello'),
                    getItem(this, Random(0, 0xffffff), 'World'),
                    getItem(this, Random(0, 0xffffff), 'Phaser3')
                ],

                space: {
                    title: 25,
                    item: 15
                }
            })
            .layout()
            //.drawBounds(this.add.graphics(), 0xff0000);
    }

    update() {}
}

var getItem = function (scene, iconColor, content) {
    return scene.rexUI.add.label({
        x: 400,
        y: 300,

        background: scene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0x888800),

        text: scene.add.text(0, 0, content, {
            fontSize: '24px'
        }),

        icon: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 15, iconColor),

        space: {
            icon: 10,
            left: 15,
            right: 15
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