import phaser from 'phaser/src/phaser.js';
import BBCodeTextPlugin from '../../plugins/bbcodetext-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var s = [];
        for (var i = 0; i < 20; i++) {
            var line;
            if (i % 2) {
                line = `[color=yellow]${i}[/color]`
            } else {
                line = `[size=40]${i}[/size]`
            }
            s.push(line);
        }

        var txt = this.add.rexBBCodeText(400, 300, s, {
            fixedLineHeightMode: false,
            backgroundColor: '#333333',
            fixedWidth: 200,
            fixedHeight: 200,
            padding: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,
            }
        })

        this.tweens.add({
            targets: txt,
            t: 1,
            duration: 5000,
            yoyo: true,
            repeat: -1,
            hold: 500,
        })

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