import 'phaser';
import DynamicTextPlugin from '../../plugins/dynamictext-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('dude', 'assets/images/phaser-dude.png');
    }

    create() {
        var text = this.add.rexDynamicText(
            {
                x: 400, y: 300,
                width: 400, height: 200,  // Set width and height

                background: {
                    stroke: 'white',
                    cornerRadius: 20
                },
                innerBounds: {
                    stroke: '#A52A2A'
                },
                padding: 20,
                style: {
                    fontSize: '16px',
                },
            }
        )

        var content = [
            'Phaser is a fast, free, and fun open source HTML5 game framework\n',
            'that offers WebGL and DynamicText rendering across desktop and mobile web browsers.\n',
            'Games can be compiled to iOS, Android and native apps by using 3rd party tools.\n',
            'You can use JavaScript or TypeScript for development.'
        ];
        text
            .appendText('Dynamic text: Page-typing ')
            .appendImage('dude', undefined, { height: 20 })
            .appendText(' ' + content[0], { color: '#FFF8DC' })
            .appendText(content[1], { color: '#008B8B' })
            .appendText(content[2], { color: '#FF7F50' })
            .appendText(content[3], { color: '#F8F8FF' });

        this.print = this.add.text(0, 580, '');

        TypingNextPage(text, {
            maxLines: 5,         // Show 5 lines per page
            padding: { bottom: 10 },
        });
    }

    update() { }
}

var TypingNextPage = function (text, config) {
    var result = text.runWordWrap(config);

    var scene = text.scene;
    var tween = scene.tweens.add({
        targets: result.children,
        delay: scene.tweens.stagger(200),
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
            if (!result.isLastPage) {
                scene.print.setText('Click to continue');
                scene.input.once('pointerdown', function () {
                    scene.print.setText('');
                    TypingNextPage(text, result);
                })
            } else {
                // On typing complete
                scene.print.setText('Typing complete');
            }
        },
        y: '-=20',
        yoyo: true,
        ease: 'Cubic'
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
        global: [{
            key: 'rexDynamicText',
            plugin: DynamicTextPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);