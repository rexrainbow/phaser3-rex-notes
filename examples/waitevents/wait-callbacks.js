import WaitEventsPlugin from '../../plugins/waitevents-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
        this.clock;
        this.text;
    }

    preload() {}

    create() {
        var t0, t1;
        var waitEvents = this.plugins.get('rexWaitEvents').add(function () {
            t1 = Date.now();
            console.log('All complete - ' + (t1 - t0));
        })
        this.time.delayedCall(500, waitEvents.waitCallback());
        this.time.delayedCall(1000, waitEvents.waitCallback());
        this.time.delayedCall(1500, waitEvents.waitCallback());
        t0 = Date.now();
    }

    update() {}
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
            key: 'rexWaitEvents',
            plugin: WaitEventsPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);