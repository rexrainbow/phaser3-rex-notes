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
                btAdd.wait({ milliseconds: '1+1+1' }),
                new MyActionNode({ i: 1 })
            ]
        });
        // var result = tree.dump();
        // var nodes = tree.getNodes();
        // debugger

        var blackboard = btAdd.blackboard();

        var scene = this;
        var RunTick = function (time, delta) {
            blackboard.setCurrentTime(time);
            var state = tree.tick(blackboard);
            console.log(`Run tick ${state}`);

            // Stop ticking
            if (state !== 3) {
                scene.events.off("update", RunTick);
            }
        };

        scene.events.on("update", RunTick);
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