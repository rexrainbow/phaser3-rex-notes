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

    preload() { }

    create() {
        var content = 'Phaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. You can use JavaScript or TypeScript for development.';
        var card = this.rexUI.add.label({
            x: 400, y: 300,
            width: 300, height: 400,
            orientation: 1,
            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY).setStrokeStyle(2, COLOR_LIGHT),
            text: this.add.text(0, 0, content, {
                wordWrap: { width: 300 - 20 - 20 }
            }),
            icon: this.rexUI.add.roundRectangle(0, 0, 160, 160, 20, COLOR_DARK),
            space: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,
                icon: 10,
            }
        }).layout();

        var flip = this.rexUI.add.flip(card, {
            face: 'front',
            front: function (gameObject) {
                var children = gameObject.getChildren(), child;
                var background = gameObject.getElement('background');
                for (var i = 0, cnt = children.length; i < cnt; i++) {
                    child = children[i];
                    if (child === background) {
                        child.setFillStyle(COLOR_PRIMARY);
                    } else {
                        gameObject.setChildVisible(child, true);
                    }
                }
            },
            back: function (gameObject) {
                var children = gameObject.getChildren(), child;
                var background = gameObject.getElement('background');
                for (var i = 0, cnt = children.length; i < cnt; i++) {
                    child = children[i];
                    if (child === background) {
                        child.setFillStyle(COLOR_DARK);
                    } else {
                        gameObject.setChildVisible(child, false);
                    }
                }
            },

            duration: 500,
        });

        card
            .setInteractive()
            .on('pointerdown', function () {
                flip.flip();
            });
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