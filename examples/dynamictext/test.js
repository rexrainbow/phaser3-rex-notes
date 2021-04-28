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
        var text = new DynamicText(this, 400, 300, 400, 100, {
            background: {
                strokeColor: 'white',
                cornerRadius: 20
            },
            padding: 20,
            style: {
                fontSize: '20px'
            },
            text: 'Phaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. You can use JavaScript or TypeScript for development.'
        })
            .runWordWrap({
                baselineOffset: 20,
                maxLines: 2
            })
        this.add.existing(text);

        var children = text.getValidChildren();
        var tween = this.tweens.add({
            targets: children,
            delay: this.tweens.stagger(200),
            duration: 500,
            onStart: function (tween, targets) {
                for (var i = 0, cnt = targets.length; i < cnt; i++) {
                    targets[i].setVisible(false);
                }
                text.background.stroke = 'green';
            },
            onUpdate: function (tween, target) {
                target.setVisible(true);
            },
            onComplete: function (tween, targets) {
                text.background.stroke = 'white';
            },
            y: '-=20',
            yoyo: true,
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