import phaser from 'phaser/src/phaser.js';
import StateManagerPlugin from '../../plugins/statemanager-plugin.js';

var StateA = {
    name: 'A',
    next: 'B',
    enter(stateManager) {
        console.log('enter A');
        stateManager.startUpdate();
    },
    update(stateManager, time, delta) {
        console.log('update A');
        stateManager.next();
    }
}

var StateB = {
    name: 'B',
    next: 'C',
    enter(stateManager) {
        console.log('enter B');
    },
    update(stateManager, time, delta) {
        console.log('update B');
        stateManager.next();
    }
}

class StateC {
    name = 'C';
    i = 0;

    next() {
        this.i++;
        if (this.i < 3) {
            return 'A';
        } else {
            return 'D';
        }
    }

    enter(stateManager) {
        console.log('enter C');
    }
    update(stateManager, time, delta) {
        console.log('update C')
        stateManager.next();
    }
}

var StateD = {
    name: 'D',
    enter(stateManager) {
        console.log('enter D');
        stateManager.stopUpdate()
    }
}

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        const states = this.plugins.get('rexStateManager').add({
            scene: this
        })
            .addStates([
                StateA,
                StateB,
                (new StateC()),
                StateD
            ])
            .goto('A')
    }

    update() {

    }
}

var config = {
    type: Phaser.AUTO,
    scale: {
        parent: 'phaser-example',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600,
    },

    scene: Demo,
    plugins: {
        global: [{
            key: 'rexStateManager',
            plugin: StateManagerPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);