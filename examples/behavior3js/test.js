import Behavior3jsPlugin from '../../plugins/behavior3js-plugin.js';

const Action = RexPlugins.Behavior3Js.Action;
class MyActionNode extends Action {
    constructor({ i = 0 } = {}) {
        super({
            name: 'MyAction',
            title: 'MyAction <i>',
            properties: { i: i },
        });
    }

    tick(tick) {
        console.log(`Tick - MyAction: ${this.properties.i}`);
        return this.SUCCESS;
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
        var b3Add = this.plugins.get('rexB3').add;
        var tree = b3Add.behaviorTree();
        tree.root = b3Add.memSequence({
            children: [
                new MyActionNode({ i: 0 }),
                b3Add.wait({ milliseconds: 3 }),
                new MyActionNode({ i: 1 })
            ]
        });
        var result = tree.dump();
        debugger

        var blackBard = b3Add.blackboard();
        var state;
        do {
            state = tree.tick(null, blackBard);
            console.log(state);
        } while (state === 3)

        do {
            state = tree.tick(null, blackBard);
            console.log(state);
        } while (state === 3)
    }

    update() {
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
            key: 'rexB3',
            plugin: Behavior3jsPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);