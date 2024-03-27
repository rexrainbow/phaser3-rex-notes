import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_MAIN = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

var content = `Phaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. You can use JavaScript or TypeScript for development.`;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('nextPage', 'assets/images/arrow-down-left.png');
    }

    create() {
        var style = {
            background: {
                radius: 20, color: COLOR_MAIN, strokeColor: COLOR_LIGHT, strokeWidth: 2
            },

            text: {
                $type: 'bbcodetext',
                fixedWidth: 500,
                fixedHeight: 65,

                fontSize: '20px',
                wrap: {
                    mode: 'word',
                    width: 500
                },
                maxLines: 3
            },

            title: { fontSize: '24px', },

            action: {
                tint: COLOR_LIGHT,
                alpha: 0
            },

            separator: {
                height: 3, color: COLOR_DARK
            },

            space: {
                left: 20, right: 20, top: 20, bottom: 20,

                icon: 10, text: 10,

                separator: 6,
            },

            align: {
                title: 'center'
            }
        }

        var textBox = this.rexUI.add.simpleTextBox(style)
            .resetDisplayContent({
                icon: null,
                title: 'Title',
                text: '',
                action: 'nextPage'
            })
            .setOrigin(0)
            .layout()
            .setPosition(100, 100)

            .setInteractive()
            .on('pointerdown', function () {
                var icon = this.getElement('action').setAlpha(0);
                this.resetChildAlphaState(icon);
                if (this.isTyping) {
                    this.stop(true);
                } else if (!this.isLastPage) {
                    this.typeNextPage();
                } else {
                    // Next actions
                }
            }, textBox)
            .on('pageend', function () {
                if (this.isLastPage) {
                    return;
                }

                var icon = this.getElement('action').setAlpha(1);
                this.resetChildAlphaState(icon);
                icon.y -= 30;
                var tween = this.scene.tweens.add({
                    targets: icon,
                    y: '+=30', // '+=100'
                    ease: 'Bounce', // 'Cubic', 'Elastic', 'Bounce', 'Back'
                    duration: 500,
                    repeat: 0, // -1: infinity
                    yoyo: false
                });
            }, textBox)
            .on('complete', function () {
                console.log('all pages typing complete')
            })

            .start(content, 50);
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