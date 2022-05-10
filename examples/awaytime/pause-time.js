import phaser from 'phaser/src/phaser.js';
import AwayTimePlugin from '../../plugins/awaytime-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var awaytimer = this.plugins.get('rexAwayTime').add();

        var print = this.add.text(0, 0, '');
        print.text += `awayTime = ${awaytimer.awayTime / 1000} seconds\n`;

        this.game.events.on('pause', function() {
            awaytimer.stop();
            print.text += 'Pause, '
        });

        this.game.events.on('resume', function() {
            print.text += `Resume, awayTime = ${awaytimer.awayTime / 1000} seconds\n`
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
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexAwayTime',
            plugin: AwayTimePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);