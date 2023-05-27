import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_PRIMARY = 0x4e342e;
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

        var textBox = this.rexUI.add.textBox({
            background: this.rexUI.add.roundRectangle({
                radius: 20,
                color: COLOR_DARK,
                strokeColor: COLOR_LIGHT, strokeWidth: 2
            }),

            text: this.rexUI.add.BBCodeText(0, 0, '', {
                fixedWidth: 500,
                fixedHeight: 65,

                fontSize: 20,
                wrap: {
                    mode: 'word',
                    width: 500
                },
                maxLines: 3
            }),

            action: this.add.image(0, 0, 'nextPage').setTint(COLOR_LIGHT).setVisible(false),

            space: {
                left: 20, right: 20, top: 30, bottom: 20,
                icon: 10,
                text: 10,
            }
        })

        var scene = this;
        textBox
            .setInteractive()
            .on('pointerdown', function () {
                var icon = this.getElement('action').setVisible(false);
                this.resetChildVisibleState(icon);
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

                var icon = this.getElement('action').setVisible(true);
                this.resetChildVisibleState(icon);
                icon.y -= 30;
                var tween = scene.tweens.add({
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
        //.on('type', function () {
        //})

        var nameText = this.rexUI.add.label({
            width: 200,
            background: this.rexUI.add.roundRectangle({
                radius: 10,
                color: COLOR_PRIMARY,
                strokeColor: COLOR_LIGHT, strokeWidth: 2
            }),
            text: this.add.text(0, 0, 'RexRexRex', { fontSize: 24 }),
            align: 'center',
            space: {
                left: 10, right: 10, top: 10, bottom: 10,
                icon: 10,
                text: 10,
            },
        });

        var ui = this.rexUI.add.sizer({
            x: 400, y: 500,
            orientation: 'y'
        })
            .add(nameText, {
                align: 'left',
                padding: { left: 30, bottom: -20 },
                key: 'name'
            })
            .add(textBox, {
                key: 'textBox'
            })
            .layout();

        ui.getElement('textBox').start(content, 10);
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