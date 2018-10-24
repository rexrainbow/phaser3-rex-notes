import UI from 'rexTemplates/ui/index.js';

const Random = Phaser.Math.Between;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

    }

    preload() {}

    create() {
        var list = new UI.List(this, {
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
        });
        list
            .layout()
            .drawBounds(this.add.graphics(), 0xff0000);
    }

    update() {}
}

var getItem = function (scene, iconColor, content) {
    return new UI.Label(scene, {
        x: 400,
        y: 300,

        text: scene.add.text(0, 0, content, {
            fontSize: '24px'
        }),

        icon: scene.add.rectangle(0, 0, 30, 30, iconColor),

        space: {
            icon: 10
        }
    });
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Demo
};

var game = new Phaser.Game(config);