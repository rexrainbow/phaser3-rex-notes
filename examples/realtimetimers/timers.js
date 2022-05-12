import phaser from 'phaser/src/phaser.js';
import RealTimeTimersPlugin from '../../plugins/realtimetimers-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        this.RTTimers = this.plugins.get('rexRealTimeTimers').add({
            // startTimestamp: new Date().getTime(), // Or get startTimestamp from server
        })
            .on('update', function () {
                console.log(JSON.stringify(this));
                // Save to localstorage or server here
            })
            .addTimer('name0', { s: 40 })
            .addTimer('name1', { m: 2 })
            .addTimer('name3', { d: 1 })

        this.RTTimers.removeTimers('name3');


        this.print = this.add.text(0, 0, '');
    }

    update() {
        var result = this.RTTimers.getTimersProgress();
        var s = '';
        for (var i = 0, cnt = result.length; i < cnt; i++) {
            var timer = result[i];
            s += `${timer.name} : ${(timer.progress * 100).toFixed(1)}%\n`;
        }
        this.print.text = s;
    }
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
            key: 'rexRealTimeTimers',
            plugin: RealTimeTimersPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);