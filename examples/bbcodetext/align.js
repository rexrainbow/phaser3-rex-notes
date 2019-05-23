import BBCodeTextPlugin from '../../plugins/bbcodetext-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var s = '[size=24][color=yellow]abc[/color][/size]'
        this.add.rexBBCodeText(400, 300, s, {
            fixedWidth: 200,
            fixedHeight: 200,
            halign: 'right',
            valign: 'bottom',
            backgroundColor: '#333333',
            padding: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,
            }
        })
            .setOrigin(0.5)

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