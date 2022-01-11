import 'phaser';
import BehaviorTreePlugin from '../../plugins/behaviortree-plugin.js';

class PrintAction extends RexPlugins.BehaviorTree.Action {
    constructor({ text = '' } = {}) {
        super({
            name: 'MyAction',
            properties: { text: text },
        });

        this.textExpression = this.addStringVariable(text);
    }

    tick(tick) {
        console.log(`Tick - Print: ${this.textExpression.eval(tick.blackboardContext)}`);
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
        tree.root = btAdd.selector({
            children: [
                btAdd.if({
                    expression: 'i >= 10',
                    child: btAdd.sequence({
                        children: [
                            new PrintAction({ text: 'Hello {{name}}' }),
                            btAdd.wait({ time: 100 }),
                            new PrintAction({ text: 'Goodbye {{name}}' }),
                        ]
                    })
                }),
                btAdd.if({
                    expression: 'true',
                    child: btAdd.sequence({
                        children: [
                            new PrintAction({ text: 'Else' }),
                        ]
                    })
                }),
            ]
        })

        // var result = tree.dump();
        // var nodes = tree.getNodes();
        // debugger

        var blackboard = btAdd.blackboard()
            .set('name', 'rex')
            .set('i', 20);

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