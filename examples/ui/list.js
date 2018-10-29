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
        var list = this.rexUI.add.list({
                x: 400,
                y: 300,

                background: this.rexUI.add.roundRectangle(0, 0, 100, 100, 10, 0x444400),

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
                    item: 15,
                    left: 20,
                    right: 20,
                    top: 20,
                    bottom: 20
                }
            })
            .layout()
            //.drawBounds(this.add.graphics(), 0xff0000)
            //.setScale(0);

        //var tween = this.tweens.add({
        //    targets: list,
        //    scaleX: 1,
        //    scaleY: 1,
        //    ease: 'Bounce', // 'Cubic', 'Elastic', 'Bounce', 'Back'
        //    duration: 1000,
        //    repeat: 0, // -1: infinity
        //    yoyo: false
        //});
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
        },

        click: function () {
            console.log(this.text);
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