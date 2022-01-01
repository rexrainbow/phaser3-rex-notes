import 'phaser';
import BehaviorTreePlugin from '../../plugins/behaviortree-plugin.js';

const Action = RexPlugins.BehaviorTree.Action;
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
        var btAdd = this.plugins.get('rexBT').add;
        var tree = btAdd.behaviorTree();
        tree.root = btAdd.sequence({
            children: [
                new MyActionNode({ i: 0 }),
                btAdd.wait({ milliseconds: 3 }),
                new MyActionNode({ i: 1 })
            ]
        });
        var result = tree.dump();
        debugger

        var blackBard = btAdd.blackboard();
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
            key: 'rexBT',
            plugin: BehaviorTreePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);