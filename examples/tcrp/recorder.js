'use strict'

import TCRPPlugin from './../../plugins/tcrp-plugin.js';
const RecorderPlugin = TCRPPlugin.Recorder;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var recorder = new RecorderPlugin(this).start();
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
    scene: Demo
};

var game = new Phaser.Game(config);