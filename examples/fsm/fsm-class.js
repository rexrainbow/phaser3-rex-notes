import FSM from '../../plugins/fsm.js';

class State extends FSM {
    constructor() {
        super();

        this.i = 0;
        this.goto('A');
    }

    next_A() {
        return 'B';
    }

    next_B() {
        return 'C';
    }

    next_C() {
        this.i++;
        if (this.i < 3) {
            return 'A';
        } else {
            return 'D';
        }
    }

    enter_A() {
        console.log('enter A');
    }

    enter_B() {
        console.log('enter B');
    }

    enter_C() {
        console.log('enter C');
    }

    exit_C() {
        console.log('exit C, i=' + this.i);
    }

    enter_D() {
        console.log('enter D');
    }
}

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var state = new State();
        state.on('statechange', function (state) {
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
    scene: Demo
};

var game = new Phaser.Game(config);