import DynamicText from '../../plugins/gameobjects/canvas/dynamictext/DynamicText.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {

    }

    create() {
        var text = new DynamicText(this, 400, 300, 400, 200, {
            background: {
                strokeColor: 'white',
                cornerRadius: 20
            },
            padding: 20,
            text: 'aabb ccdd eeff gghh iijj kkll mmnn oopp qqrr xxyy'
        })
            .runWordWrap({
                maxLines: 4
            })
        this.add.existing(text);

        var startX = text.width / 2,
            startY = text.height / 2;
        var tween = this.tweens.add({
            targets: text.children,
            delay: this.tweens.stagger(100),
            // onStart: function (tween, targets) {
            //     for (var i = 0, cnt = targets.length; i < cnt; i++) {
            //         targets[i].setVisible(false);
            //     }
            // },
            props: {
                x: {
                    value: {
                        getStart: function (target) {
                            return startX;
                        },

                        getEnd: function (target) {
                            return target.x;
                        }
                    }
                },

                y: {
                    value: {
                        getStart: function (target) {
                            return startY;
                        },

                        getEnd: function (target) {
                            return target.y;
                        }
                    }
                }
            }
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
    scene: Demo
};

var game = new Phaser.Game(config);