import TCRPPlugin from '../../plugins/tcrp-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var recorder = this.plugins.get('rexTCRP').addRecorder(this).start();
        recorder
            .addCommand(['print', 'hello'])
            .addCommand(['print', 'world']);
        console.log(recorder.getCommands());
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
            key: 'rexTCRP',
            plugin: TCRPPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);