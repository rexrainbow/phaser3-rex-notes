'use strict'

import TickTasksPlugin from 'rexPlugins/ticktasks-plugin.js';


const GetValue = Phaser.Utils.Objects.GetValue;

class MyTask {
    constructor(target, parentTask, config) {
        this.target = target;
        this.parentTask = parentTask;
        this.speed = GetValue(config, 'speed', 180);
    }

    step(time, delta) {
        this.target.angle += this.speed * (delta * 0.001);
    }
}

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('bg', 'assets/images/white-dot.png');
    }

    create() {
        var bg = this.add.image(400, 300, 'bg')
            .setDisplaySize(300, 300)
            .setTint(0xcccccc);
        this.plugins.get('rexTickTasks').add(bg, {
            type: MyTask,
            speed: 60
        });
    }

    update() {}
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexTickTasks',
            plugin: TickTasksPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);