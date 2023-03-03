import phaser from 'phaser/src/phaser.js';
import FSMPlugin from '../../plugins/fsm-plugin.js';

class StateA {
    enter() {
        console.log('enter A')
    }
    next() {
        return 'B';
    }
}

class StateB {
    enter() {
        console.log('enter B')
    }
    next() {
        return 'C';
    }
}

class StateC {
    enter() {
        console.log('enter C')
    }
    next() {
        this.i++;
        if (this.i < 3) {
            return 'A';
        } else {
            return 'D';
        }
    }
    exit() {
        console.log('exit C, i=' + this.i)
    }
}

class StateD {
    enter() {
        console.log('enter D')
    }
}
var stateConfig = {
    start: 'A',
    states: {
        A: new StateA(),
        B: new StateB(),
        C: new StateC(),
        D: new StateD(),
    },
    extend: {
        i: 0
    }
};

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var state = this.plugins.get('rexFSM').add(stateConfig)
            .on('statechange', function (state) {
                console.log('StateChange');
            });
        this.input.on('pointerup', function () {
            state.next();
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
            key: 'rexFSM',
            plugin: FSMPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);