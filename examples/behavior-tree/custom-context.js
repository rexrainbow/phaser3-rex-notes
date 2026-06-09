import Phaser from 'phaser';
import BehaviorTreePlugin from '../../plugins/behaviortree-plugin.js';
import ClockPlugin from '../../plugins/clock-plugin.js';
import mustache from 'mustache';

class World {
    constructor() {
        this.state = {
            player: {
                name: 'rex',
                coin: 10
            }
        };

        this.system = {

        };
    }

    getEvalContext() {
        return this;
    }

    set(key, value) {
        this.system[key] = value;
        return this;
    }
    get(key) {
        return this.system[key]
    }
    has(key) {
        return key in this.system;
    }

    dump() {
        var systemData = { ...this.system };
        return {
            system: systemData
        }
    }
    load(data) {
        this.system = data.system;
        return this;
    }

    get player() {
        return this.state.player;
    }

    get time() {
        return this.system.$currentTime;
    }

}

class PrintAction extends RexPlugins.BehaviorTree.Action {
    constructor(config = {}, nodePool) {
        if (nodePool) {  // Rebuild node, don't touch config
            super(config, nodePool);

        } else {  // New node
            var { text = '' } = config;
            super(
                {
                    name: 'MyAction',
                    properties: { text: text },
                },
            );
        }

        this.text = this.properties.text;
    }

    tick(tick) {
        var context = tick.getEvalContext();  // World instance
        // var text = mustache.render(this.text, context);  // Use mustache string template
        var text = tick.stringTemplate.render(this.text, context); // Use built-in string template
        console.log(`Print: ${text}`);
        return this.SUCCESS;
    }
}

class Comparator extends RexPlugins.BehaviorTree.Expression {
    constructor(config = {}, nodePool) {
        if (nodePool) {  // Rebuild node, don't touch config
            super(config, nodePool);

        } else {  // New node
            var {
                opA = 'true',
                cmp = '==',
                opB = 'true'
            } = config;
            super(
                {
                    name: 'MyComparator',
                    properties: {
                        opA, cmp, opB,
                    },
                },
            );
        }

        var opA = this.properties.opA;
        var cmp = this.properties.cmp;
        var opB = this.properties.opB;
        this.condition = `(${opA})${cmp}(${opB})`;
    }

    eval(tick) {
        var context = tick.getEvalContext();  // World instance
        var value = tick.expressionParser.exec(this.condition, context);
        return value;
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
        var world = new World();

        var CreateTask = function (taskName, waitDuration) {
            if (waitDuration === undefined) {
                waitDuration = 1000;
            }

            return btAdd.sequence({
                children: [
                    new PrintAction({ text: `${taskName}.Start : {{$time}}, hello {{player.name}}` }),
                    btAdd.wait({ duration: waitDuration }),
                    new PrintAction({ text: `${taskName}.End : {{time}}` }),
                ]
            });
        }
        var tree = btAdd.behaviorTree()
            .setRoot(
                btAdd.ifSelector({
                    condition: new Comparator({
                        opA: 'player.coin', cmp: '>', opB: 'time * 0.001'
                    }),
                    children: [
                        CreateTask('TaskA', 500),
                        CreateTask('TaskB', 500)
                    ]
                })

            )

        var blackboard = btAdd.blackboard({
            globalMemory: world
        });
        var clock = this.plugins.get('rexClock').add(this);
        clock
            .on('update', function (time, delta) {
                blackboard.setCurrentTime(time);
                var state = tree.tick(blackboard);
                console.log(`Run tick ${state}`);

                // Stop ticking
                if (!tree.isRunningState()) {
                    clock.stop();
                }
            })
            .start()
            .tick(0);
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
        global: [
            {
                key: 'rexBT',
                plugin: BehaviorTreePlugin,
                start: true
            },
            {
                key: 'rexClock',
                plugin: ClockPlugin,
                start: true
            }
        ]
    }
};

var game = new Phaser.Game(config);
