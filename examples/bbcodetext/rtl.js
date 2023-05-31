import phaser from 'phaser/src/phaser.js';
import BBCodeTextPlugin from '../../plugins/bbcodetext-plugin.js';

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
        this.add.text(
            300, 250,
            'יא פרו...',
            {
                fixedWidth: 150, fixedHeight: 80,
                padding: {
                    left: 15, right: 15, top: 15, bottom: 15
                },
                backgroundColor: '#333333',
                rtl: true
            }
        );

        this.add.rexBBCodeText(
            300, 350,
            'יא פרו.[color=red].[color=blue].',
            {
                fixedWidth: 150, fixedHeight: 80,
                padding: {
                    left: 15, right: 15, top: 15, bottom: 15
                },
                backgroundColor: '#333333',
                backgroundCornerRadius: 10,
                // align: 'center',
                rtl: true
            }
        );

        this.add.text(
            500, 250,
            'ABCDE',
            {
                fixedWidth: 150, fixedHeight: 80,
                padding: {
                    left: 15, right: 15, top: 15, bottom: 15
                },
                backgroundColor: '#333333',
                rtl: true
            }
        );

        this.add.rexBBCodeText(
            500, 350,
            '[color=red]AB[color=blue]CD[/color]E',
            {
                fixedWidth: 150, fixedHeight: 80,
                padding: {
                    left: 15, right: 15, top: 15, bottom: 15
                },
                backgroundColor: '#333333',
                backgroundCornerRadius: 10,
                // align: 'center',
                rtl: true
            }
        );

        var ltrContent = 'A[color=red]B[/color]CD...[img=dude]';
        var rtlContent = 'יא פ[color=red]ר[/color]ו...[img=dude]';
        var txt = this.add.rexBBCodeText(
            550, 350,
            ltrContent,
            {
                fixedWidth: 150, fixedHeight: 80,
                padding: {
                    left: 15, right: 15, top: 15, bottom: 15
                },
                backgroundColor: '#333333',
                backgroundCornerRadius: 10,
                // align: 'center',

                images: {
                    'dude': {
                        height: 16,
                    }
                }
            }
        );

        this.input.on('pointerdown', function () {
            var rtl = !txt.style.rtl;
            txt.setRTL(rtl).setText((rtl) ? rtlContent : ltrContent);
        })

        this.add.text(550, 580, 'Any click to toggle rtl')

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
        global: [{
            key: 'BBCodeTextPlugin',
            plugin: BBCodeTextPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);